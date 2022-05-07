import React from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';

export default function ForgotPassword({status}) {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password"/>

            <div className="mb-4 text-sm text-secondary">
                <strong>Forgot your password?</strong> No problem. Just let us know your email address and we will email
                you a password reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-weight-semibold text-sm">{status}</div>}

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <input
                    type="text"
                    name="email"
                    value={data.email}
                    className="shadow-sm rounded-md form-control"
                    autoFocus={true}
                    placeholder={'Email address'}
                    onChange={onHandleChange}
                />

                <div className="d-flex align-items-center justify-content-end mt-4">
                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   loading={processing}>
                        Email Password Reset Link
                    </LoadingButton>
                </div>
            </form>
        </>
    );
}
