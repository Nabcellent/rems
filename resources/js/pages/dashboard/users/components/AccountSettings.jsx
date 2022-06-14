import { Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';

const AccountSettings = () => {
    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Account Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked/>}
                                          label="Hide phone number from other users."/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked/>} label="Enable email notifications"/>
                        <FormControlLabel control={<Switch defaultChecked/>} label="Enable sms notifications"/>
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AccountSettings;
