export default class Mpesa {
    baseUrl = '/api/mpesa';
    request_id = null;
    onSuccess = () => {
    };

    init = async ({ phone, amount, reference, description, onSuccess, ...data }) => {
        const { data: stkRequest } = await axios.post(`${this.baseUrl}/stk/initiate`, {
            phone,
            amount: 1,
            reference, description,
            ...data,
        }, { headers: { 'Accept': 'application/json' } });

        if (stkRequest) {
            console.log(stkRequest);
            this.request_id = stkRequest.id;
            this.onSuccess = onSuccess;

            return await this.alert();
        }
    };

    fetchStkStatus = async () => {
        return axios.post(`${this.baseUrl}/stk/query-status`, { request_id: this.request_id })
                    .then(({ data }) => data);
    };

    alert = (data = {}) => {
        let sweetText = data.sweetText ?? "Your request has been received and is being processed. PLEASE ENTER MPESA PIN when prompted, then click OK.";

        return Sweet.fire({
            icon: "info",
            titleText: "REMS",
            text: sweetText,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            backdrop: `rgba(0, 0, 123, 0.4)`,
            preConfirm: () => {
                return axios.post(`${this.baseUrl}/stk/query-status`, { request_id: this.request_id })
                            .then(({ data }) => data).catch(async err => {
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

            this.onSuccess(stkStatus);
        } else {
            type = 'warning';
            message = 'Something went wrong!';
            showConfirmButton = true;
        }

        await sweet({ type, message, showConfirmButton });
    }
};
