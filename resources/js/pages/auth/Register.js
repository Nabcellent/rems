import React, { useEffect } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';
import { HowToReg } from '@mui/icons-material';

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        first_name: '',
        last_name: '',
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
        <>
            <Head><title>Sign Up</title></Head>
            <h4>Sign Up</h4>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit} className={'row'}>
                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="first_name">First Name</label>

                    <input type="text" name="first_name" value={data.first_name}
                           className="shadow-sm rounded-md form-control"
                           autoComplete="name" autoFocus onChange={onHandleChange} required/>
                </div>

                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="last_name">Last Name</label>

                    <input type="text" name="last_name" value={data.last_name}
                           className="shadow-sm rounded-md form-control"
                           autoComplete="name" onChange={onHandleChange} required/>
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="email">Email</label>

                    <input type="email" name="email" value={data.email}
                           className="shadow-sm rounded-md form-control" autoComplete="username"
                           onChange={onHandleChange} required
                    />
                </div>

                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="password">Password</label>

                    <input type="password" name="password" value={data.password}
                           className="shadow-sm rounded-md form-control" autoComplete="new-password"
                           onChange={onHandleChange} required
                    />
                </div>

                <div className="col-12 col-lg-6 mt-3">
                    <label htmlFor="password_confirmation">Confirm Password</label>

                    <input type="password" name="password_confirmation" value={data.password_confirmation}
                           className="shadow-sm rounded-md form-control" onChange={onHandleChange} required
                    />
                </div>

                <div className="d-flex align-items-center justify-content-between mt-3">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already belong?
                    </Link>

                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   loading={processing} endIcon={<HowToReg fontSize={'small'}/>}>
                        Register
                    </LoadingButton>
                </div>
            </form>
        </>
    );
}
