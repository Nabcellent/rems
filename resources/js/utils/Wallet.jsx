import React from "react";
import { currencyFormat } from '@/utils/helpers';
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
            icon: "info",
            html: <small>{currencyFormat(amount)} will automatically be deducted from your wallet.</small>,
            backdrop: `rgba(150, 0, 0, 0.4)`,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return await axios.put(route('dashboard.wallet.debit', {
                    user: formData.user_id,
                    transaction: transaction_id
                }), {
                    amount,
                    transaction_id
                }).then(({ data }) => data);
            },
            allowOutsideClick: () => !Sweet.isLoading(),
            footer: 'REMS',
        }).then(async ({ value, isDismissed }) => {
            console.log(value);

            if (value.status === Status.COMPLETED) {
                onCompleted({ amount });

                await sweet({ type: 'success', message: 'Payment Completed' });
            }

            if (isDismissed) {
                await sweet({ type: 'info', message: 'Payment Cancelled!' });
            }
        });
    };
}
