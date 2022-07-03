import { getTelcoFromPhone } from '@/utils/helpers';
import { Telco } from '@/utils/enums';

export default class Mpesa {
    baseUrl = '/api/mpesa';
    request_id = null;
    amount = 0;
    onSuccess = () => {
    };

    static fire = async (details, onCompleted) => {
        await Sweet.fire({
            html:
                '<small>Amount (min: 100)</small>' +
                '<input id="amount" type="number" class="form-control mb-1" placeholder="Enter amount to deposit.">' +
                `<small>Phone number ${details.user.phone ? '(optional)' : ''}</small>` +
                `<input id="phone" type="tel" class="form-control" value="${details.user.phone ?? ''}" placeholder="Enter phone to request.">`,
            showLoaderOnConfirm: true,
            backdrop: `rgba(150, 0, 0, 0.4)`,
            preConfirm: async () => {
                const amount = document.getElementById('amount').value,
                    phone = document.getElementById('phone').value;

                if (!(parseFloat(amount) >= 100)) return Sweet.showValidationMessage('Invalid Amount!');
                if (getTelcoFromPhone(phone) !== Telco.SAFARICOM) return Sweet.showValidationMessage('Invalid Safaricom Number!');

                try {
                    await new Mpesa().init({
                        amount, phone,
                        reference: 'REMS Wallet',
                        description: details.description,
                        user_id: details.user.id,
                        destination_id: details.destinationId,
                        onSuccess: () => onCompleted({ amount }),
                    });
                } catch (err) {
                    const message = err.response.data.message;

                    return Sweet.showValidationMessage(message);
                }

                return { amount, phone };
            },
            allowOutsideClick: () => !Sweet.isLoading()
        });
    };

    init = async ({ phone, amount, reference, description, onSuccess, ...data }) => {
        this.amount = amount;

        const { data: stkRequest } = await axios.post(`${this.baseUrl}/stk/initiate`, {
            phone,
            amount: 1,
            reference, description,
            ...data,
        }, { headers: { 'Accept': 'application/json' } });

        if (stkRequest) {
            console.log(stkRequest);

            if(Number(stkRequest.ResponseCode) !== 0) {
                return await sweet({
                    type: 'error',
                    message: 'Something went wrong!',
                    toast: false,
                    text: 'Oops...',
                    position: 'center',
                    duration: 30,
                    backdrop: `rgba(150, 0, 0, 0.4)`,
                    footer: '<a href="/contact-us">Report this issue?</a>'
                });
            }

            this.request_id = stkRequest.id;
            this.onSuccess = onSuccess;

            return await this.alert();
        }
    };

    fetchStkStatus = async () => {
        return axios.post(`${this.baseUrl}/stk/query-status`, { request_id: this.request_id, amount: this.amount })
                    .then(({ data }) => data);
    };

    alert = (data = {}) => {
        let sweetText = data.sweetText ?? "<small>Your request has been received and is being processed. <b>PLEASE ENTER MPESA PIN</b> when prompted, WAIT for the MPESA message, then click OK.</small>";

        return Sweet.fire({
            icon: "info",
            titleText: "REMS",
            html: sweetText,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            backdrop: `rgba(0, 0, 123, 0.4)`,
            preConfirm: () => {
                return this.fetchStkStatus().catch(async err => {
                    console.log(err);
                    await sweet({
                        type: 'error',
                        message: 'Something went wrong!',
                        toast: false,
                        text: 'Oops...',
                        position: 'center',
                        duration: 30,
                        backdrop: `rgba(150, 0, 0, 0.4)`,
                        footer: '<a href="/contact-us">Report this issue?</a>'
                    });

                    return false;
                });
            },
            allowOutsideClick: () => !Sweet.isLoading(),
        }).then(async (result) => {
            if (result.isDismissed && result.dismiss === Sweet.DismissReason.cancel) {
                await sweet({ type: 'info', message: 'Payment Cancelled' });
            } else if (result.isConfirmed && result.value) {
                return await this.confirmResponse(result.value);
            } else {
                return await this.fetchStkStatus().then(result => this.confirmResponse(result));
            }
        });
    };

    async confirmResponse(stkStatus) {
        console.log(stkStatus);

        const { ResultCode, errorCode } = stkStatus;

        let type, message, showConfirmButton = false;

        if (errorCode && errorCode === '500.001.1001') {
            return this.alert({ sweetText: 'Payment still in process. Please wait until you receive the M-Pesa message.' });
        } else if (ResultCode === "1032") {
            type = 'info';
            message = 'Payment Cancelled!';
        } else if (ResultCode === "0") {
            type = 'success';
            message = 'Payment Successful!';

            this.onSuccess();
        } else {
            type = 'warning';
            message = 'Something went wrong!';
            showConfirmButton = true;
        }

        await sweet({ type, message, showConfirmButton });
    }
};
