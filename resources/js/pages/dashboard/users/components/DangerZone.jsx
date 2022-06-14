import { Button, Divider, FormControlLabel, FormGroup, Grid, Paper, Switch } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';

const DangerZone = () => {
    return (
        <Paper>
            <Card.Header><h5 className={'mb-0'}>Danger Zone</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <h5 className={'mb-0'}>Delete Account</h5>
                    <p>Once you delete this account, there is no going back! Please be certain.</p>
                    <Button color={'error'} fullWidth>Delete Account</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DangerZone;
