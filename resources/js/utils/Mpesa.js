export const Mpesa = {
    init: async ({ phone, amount, reference, description, onSuccess }) => {
        const { data: { checkout_request_id } } = await axios.post(`/api/mpesa/stk/initiate`, {
            phone,
            amount: 1,
            reference,
            description,
        });

        if(checkout_request_id) {
            
        }
        console.log(checkout_request_id);
    }
};
