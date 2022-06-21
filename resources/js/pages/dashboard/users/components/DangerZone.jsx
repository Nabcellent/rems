import { Button, Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';
import { PersonRemove } from '@mui/icons-material';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

const DangerZone = () => {
    const { auth: { user } } = usePage().props;

    return (
        <Paper>
            <Card.Header><h5 className={'mb-0'} style={{ color: '#990000' }}>Danger Zone</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <h5 className={'mb-0'}>Delete Account</h5>
                    <p>Once you delete this account, there is no going back! Please be certain.</p>
                    <Button startIcon={<PersonRemove/>} color={'error'} onClick={async () => {
                        await Sweet.fire({
                            title: 'Are you sure?',
                            html: `<small>You <b>won't</b> be able to revert this!<br> Enter your email <i>${user.email}</i> to confirm.</small>`,
                            icon: 'warning',
                            input: 'email',
                            inputAttributes: {
                                autocapitalize: 'off',
                                placeholder: 'Email address...'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Yes, delete account!',
                            backdrop: `rgba(150, 0, 0, 0.7)`,
                            allowOutsideClick: () => !Sweet.isLoading(),
                            preConfirm: inputValue => {
                                if (inputValue !== user.email) Sweet.showValidationMessage('Email is incorrect.');

                                return axios.delete(route("dashboard.users.accounts.destroy"), { headers: { 'Accept': 'application/json' } })
                                            .then(({ data }) => {
                                                return data;
                                            }).catch(err => Sweet.showValidationMessage(`Request failed: ${err}`));
                            }
                        }).then((result) => {
                            if (result.isConfirmed && result.value?.status) {
                                Sweet.fire({
                                    title: 'Deleted!',
                                    text: 'Your account has been deleted.',
                                    icon: 'success',
                                    allowOutsideClick: false,
                                    timer: 3000,
                                    showConfirmButton: false
                                }).then(() => Inertia.post(route('logout')));
                            }
                        });
                    }} fullWidth>Delete Account</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DangerZone;
