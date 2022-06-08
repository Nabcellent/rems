import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Status } from '@/utils/enums';

export default class PayPal {
    baseUrl = '/api/paypal';

    static fire = async (details, onCompleted) => {
        await Sweet.fire({
            html:
                '<small>Amount (min: 100)</small>' +
                '<input id="amount" type="number" class="form-control mb-1" placeholder="Enter amount to deposit.">',
            showLoaderOnConfirm: true,
            backdrop: `rgba(150, 0, 0, 0.4)`,
            preConfirm: async () => {
                const amount = document.getElementById('amount').value;

                if (!(parseFloat(amount) >= 100)) return Sweet.showValidationMessage('Invalid Amount!');

                return await new PayPal().init({
                    amount,
                    user_id: details.user.id,
                    destination_id: details.destinationId,
                    description: details.description,
                    onSuccess: () => onCompleted({ amount }),
                });
            },
            allowOutsideClick: () => !Sweet.isLoading()
        });
    };

    init = async ({ amount, onSuccess, ...formData }) => {
        const { data: { id: transactionId } } = await axios.post(`${this.baseUrl}/transactions`, {
            amount,
            ...formData
        });

        console.log(transactionId);

        const createOrder = (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "0.01",
                        },
                        payee: {
                            email_address: 'sb-kg0wb2320059@business.example.com'
                        }
                    },
                ],
            });
        };

        const onApprove = (data, actions) => {
            return actions.order.capture().then(async details => {
                console.log(data);
                console.log(actions);
                console.log(details);

                const { status } = await axios.put(`${this.baseUrl}/transactions/${transactionId}`, {
                    payload: details
                });

                if (status === 200) onSuccess();
            });
        };

        const onCancel = async (data) => {
            await axios.put(`${this.baseUrl}/transactions/${transactionId}`, {
                payload: { status: Status.CANCELLED, ...data }
            });
        };

        const onError = async (data) => {
            await axios.put(`${this.baseUrl}/transactions/${transactionId}`, {
                payload: { status: Status.FAILED, ...data }
            });
        };

        await Sweet.fire({
            html: (
                <PayPalScriptProvider options={{
                    "client-id": "AYXp1jXvuBqmHZNm4PigmNrtubq1f0oGGmdIbatPCiF6f_yIStH17cNkb8aXk39596dF6Ut_Bxrm-Zj5",
                    currency: "USD",
                }}>
                    <PayPalButtons style={{ color: 'silver', shape: 'pill', label: 'pay' }}
                                   createOrder={(data, actions) => createOrder(data, actions)}
                                   onApprove={(data, actions) => onApprove(data, actions)}
                                   onCancel={data => onCancel(data)}
                                   onError={data => onError(data)}/>
                </PayPalScriptProvider>
            ),
            showConfirmButton: false,
            backdrop: `rgba(150, 0, 0, 0.4)`,
        });
    };
}
