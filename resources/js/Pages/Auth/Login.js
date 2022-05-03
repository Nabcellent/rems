import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';
import { VpnKey } from '@mui/icons-material';

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
        <>
            <Head><title>Sign In</title></Head>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="username" className={'block font-medium text-sm text-gray-700'}>Email / Phone
                        number</label>

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
        </>
    );
}
