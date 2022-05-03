import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before continuing.
            </div>

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="shadow-sm rounded-md form-control"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="d-flex align-items-center justify-content-end mt-4">
                    <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4" loading={processing}>
                        Confirm Password
                    </LoadingButton>
                </div>
            </form>
        </>
    );
}
