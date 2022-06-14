import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Alert } from '@mui/material';

export default function VerifyEmail({ status, email }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification"/>

            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <Alert severity="success">
                    A new verification link has been sent to <b>{email}</b>.
                </Alert>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 d-flex align-items-center justify-content-between">
                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   loading={processing}>
                        Resend Verification Email
                    </LoadingButton>

                    <Link href={route('logout')} method="post" as="span">
                        <LoadingButton type={'submit'} size={'small'} loading={processing}>Sign Out</LoadingButton>
                    </Link>
                </div>
            </form>
        </>
    );
}
