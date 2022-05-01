import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register"/>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit} className={'row'}>
                <div className={'col-12'}>
                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="name"
                        autoFocus={true}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="email">Email</label>

                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="username"
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="new-password"
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="password_confirmation">Confirm Password</label>

                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="shadow-sm rounded-md form-control"
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className="d-flex align-items-center justify-content-between mt-3">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <LoadingButton size={'small'} variant={'contained'} className="ml-4" loading={processing}>
                        Register
                    </LoadingButton>
                </div>
            </form>
        </Guest>
    );
}
