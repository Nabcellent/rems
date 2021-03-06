import React, { useEffect } from 'react';
import ValidationErrors from '@/components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { LoadingButton } from '@mui/lab';
import { HowToReg } from '@mui/icons-material';
import { Chip, Grid, TextField } from '@mui/material';
import Auth from '@/layouts/Auth';
import { Role } from '@/utils/enums';
import ControlledAutoComplete from '@/components/ControlledAutoComplete';

export default function Register({ role, services }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        services: [],
        email: '',
        password: '',
        password_confirmation: '',
        role
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Auth>
            <Head><title>Sign Up</title></Head>
            <h4>Sign Up</h4>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <Grid container spacing={2}>
                    {[Role.SERVICE_PROVIDER, Role.PROPERTY_MANAGER].includes(role) ? (
                        <Grid item xs={12}>
                            <TextField size={"small"} label="Username" placeholder="Username..." name={'username'}
                                       value={data.username} autoFocus onChange={onHandleChange} autoComplete="name"
                                       required/>
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={12} lg={6}>
                                <TextField size={"small"} label="First Name" placeholder="First Name..."
                                           name={'first_name'} value={data.first_name} autoFocus
                                           onChange={onHandleChange} autoComplete="name" required/>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField size={"small"} label="Last Name" placeholder="Last Name..."
                                           name={'last_name'} value={data.last_name} onChange={onHandleChange}
                                           autoComplete="name"
                                           required/>
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <TextField size={"small"} label="Email" placeholder="Email..." name={'email'} value={data.email}
                                   onChange={onHandleChange} autoComplete="off" required/>
                    </Grid>
                    {role === Role.SERVICE_PROVIDER && (
                        <Grid item lg={12}>
                            <ControlledAutoComplete multiple name={'services'} value={data.services}
                                                    options={services} getOptionLabel={o => o.name ?? o}
                                                    onChange={(event, value) => setData('services', value)}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, i) => <Chip
                                                            label={option} {...getTagProps({ i })}/>)}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Services"
                                                                   placeholder={'Services...'}/>
                                                    )}/>
                        </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                        <TextField type="password" size={"small"} label="Password" placeholder="Password..."
                                   name={'password'} value={data.password} onChange={onHandleChange}
                                   autoComplete="off" required/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField type="password" size={"small"} label="Password Confirmation"
                                   placeholder="Password confirmation..." name={'password_confirmation'}
                                   value={data.password_confirmation} onChange={onHandleChange} autoComplete="off"
                                   required/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already belong?
                            </Link>

                            <LoadingButton type={'submit'} size={'small'} variant={'contained'} className="ml-4"
                                           loading={processing} endIcon={<HowToReg fontSize={'small'}/>}>
                                Register
                            </LoadingButton>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </Auth>
    );
}
