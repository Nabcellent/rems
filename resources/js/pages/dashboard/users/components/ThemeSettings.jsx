import { Divider, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Switch, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import AccountSettings from '@/pages/dashboard/users/components/AccountSettings';
import ColorDot from '@/components/ColorDot';

const ThemeSettings = ({ settings }) => {
    return (
        <Paper className={'mb-3'}>
            <Card.Header><h5 className={'mb-0'}>Theme Settings</h5></Card.Header>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={settings.dark_mode.value}/>}
                                          label="Enable dark mode"/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField select fullWidth label={'Main Color'} value={settings.color.value}>
                        <MenuItem value={'#990000'}><ColorDot color={'#990000'}/> Crimson Red</MenuItem>
                        <MenuItem value={'#000'}><ColorDot color={'#000'}/> Black</MenuItem>
                        <MenuItem value={'#157DEC'}><ColorDot color={'#157DEC'}/> Dress Blue</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Paper>
    );
};

ThemeSettings.propTypes = {
    settings: PropTypes.object.isRequired
};

export default ThemeSettings;
