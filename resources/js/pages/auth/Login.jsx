import React, { useEffect } from 'react';
import Checkbox from '@/components/Checkbox';
import ValidationErrors from '@/components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';
import { VpnKey } from '@mui/icons-material';
import { TextField } from '@mui/material';
import Auth from '@/layouts/Auth';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Auth>
            <Head><title>Sign In</title></Head>
            <h4>Sign In</h4>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <div className={'mt-3'}>
                    <TextField size={"small"} label="Email / Phone number" placeholder="Email address or phone number..."
                               name={'username'} value={data.username} autoFocus onChange={onHandleChange}
                               autoComplete="username" fullWidth/>
                </div>

                <div className="mt-4">
                    <TextField size={"small"} label="Password" placeholder="Password" type={'password'}
                               name={'password'} value={data.password} onChange={onHandleChange}
                               autoComplete="current-password" fullWidth/>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4">
                    <label className="flex items-center m-0">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange}/>

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link href={route('password.request')}
                              className="underline text-gray-600 hover:text-gray-900 small">
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4">
                    <Link href={route('register')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Wanna join?
                    </Link>

                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   endIcon={<VpnKey fontSize={'small'}/>} loading={processing}>
                        Sign In
                    </LoadingButton>
                </div>
            </form>
        </Auth>
    );
}
