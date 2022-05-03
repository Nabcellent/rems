import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
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
        <Guest>
            <Head><title>Sign In</title></Head>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="username" className={'block font-medium text-sm text-gray-700'}>Email or Phone number</label>

                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="username"
                        autoFocus={true}
                        onChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className={'block font-medium text-sm text-gray-700'}>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="current-password"
                        onChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange}/>

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-4">
                    {canResetPassword && (
                        <Link href={route('password.request')}
                              className="underline text-sm text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </Link>
                    )}

                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   loading={processing}>
                        Sign in
                    </LoadingButton>
                </div>
            </form>
        </Guest>
    );
}
