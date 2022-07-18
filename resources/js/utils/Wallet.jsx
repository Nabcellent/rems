import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Status } from '@/utils/enums';

export default class Wallet {
    baseUrl = '/api/paypal';

    static fire = async (details, onCompleted) => {
        await Sweet.fire({
            html:
                '<small>Amount (min: 100)</small>' +
                `<input id="amount" type="number" value="${details.amount ?? ''}" class="form-control mb-1" placeholder="Enter amount to deposit.">`,
            showLoaderOnConfirm: true,
            backdrop: `rgba(150, 0, 0, 0.4)`,
            preConfirm: async () => {
                const amount = document.getElementById('amount').value;

                if (parseFloat(amount) > details.user.wallet_balance)
                    return Sweet.showValidationMessage(`Your wallet balance is insufficient! <a href="${route('dashboard.wallet')}"> <b>Top Up?</b></a>`);

                return await new Wallet().init({
                    amount,
                    user_id: details.user.id,
                    description: details.description,
                    transactionable_id: details.transactionableId,
                    transactionable: details.transactionable,
                    onCompleted: onCompleted,
                });
            },
            allowOutsideClick: () => !Sweet.isLoading()
        });
    };

    init = async ({ amount, onCompleted, ...formData }) => {
        const { data: { id: transaction_id } } = await axios.post(`${this.baseUrl}/transactions`, {
            amount, ...formData
        });



        await Sweet.fire({
            html: (
                <PayPalScriptProvider options={{
                    "client-id": "AYXp1jXvuBqmHZNm4PigmNrtubq1f0oGGmdIbatPCiF6f_yIStH17cNkb8aXk39596dF6Ut_Bxrm-Zj5",
                    currency: "USD",
                }}>
                    <ButtonWrapper createOrder={(data, actions) => createOrder(data, actions)}
                                   onApprove={(data, actions) => onApprove(data, actions)}
                                   onCancel={data => onCancel(data)} onError={data => onError(data)}/>
                </PayPalScriptProvider>
            ),
            showConfirmButton: false,
            backdrop: `rgba(150, 0, 0, 0.4)`,
        });
    };
}
