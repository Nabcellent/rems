import { Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import AccountSettings from '@/pages/dashboard/users/components/AccountSettings';

const BillingSettings = ({settings}) => {
    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Billing Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={settings.auto_charge_wallet.value}/>} label="Enable wallet auto charge"/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <h5>Plans</h5>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <h5>Payments</h5>
                </Grid>
            </Grid>
        </Paper>
    );
};

BillingSettings.propTypes = {
    settings: PropTypes.object.isRequired
}

export default BillingSettings;
