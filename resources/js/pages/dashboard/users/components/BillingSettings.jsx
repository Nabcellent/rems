import { Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';

const BillingSettings = () => {
    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Billing Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
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

export default BillingSettings;
