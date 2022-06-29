import React, { useEffect } from 'react';
import Input from '@/components/Input';
import Label from '@/components/Label';
import ValidationErrors from '@/components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <>
            <Head title="Reset Password"/>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email"/>

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="username"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password"/>

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password"/>

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="shadow-sm rounded-md form-control"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="d-flex align-items-center justify-content-end mt-4">
                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                   loading={processing}>
                        Reset Password
                    </LoadingButton>
                </div>
            </form>
        </>
    );
}
