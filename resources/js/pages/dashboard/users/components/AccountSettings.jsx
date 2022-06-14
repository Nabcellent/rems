import { Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const AccountSettings = ({ settings }) => {
    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Account Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={settings.hide_phone_from_others.value}/>}
                                          label="Hide phone number from other users."/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={settings.notify_email.value}/>}
                                          label="Enable email notifications"/>
                        <FormControlLabel control={<Switch checked={settings.notify_sms.value}/>}
                                          label="Enable sms notifications"/>
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper>
    );
};

AccountSettings.propTypes = {
    settings: PropTypes.object.isRequired
};

export default AccountSettings;
