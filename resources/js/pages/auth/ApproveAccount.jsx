import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Head, Link } from '@inertiajs/inertia-react';

export default function ApproveAccount({ auth }) {
    return (
        <>
            <Head><title>Account Approval</title></Head>

            <h4 className={'text-primary'}><b>Hey {auth.user.first_name}!</b></h4>

            <div className="mb-4 mt-3 text-sm text-gray-600">
                <b>Thank you for signing up!</b> Just before getting started, we need to approve your account. Please be patient
                as we will notify you via email as soon as possible once your account has been approved.
            </div>

            <div className="mt-4 text-end">
                <Link href={route('logout')} method="post" as="span">
                    <LoadingButton type={'submit'} size={'small'}>Sign Out</LoadingButton>
                </Link>
            </div>
        </>
    );
}
