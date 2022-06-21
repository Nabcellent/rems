import { FormControlLabel, FormGroup, Grid, MenuItem, Paper, Switch, TextField } from '@mui/material';
import { Card } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ColorDot from '@/components/ColorDot';
import { useFormik } from 'formik';
import { Inertia } from '@inertiajs/inertia';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import ValidationErrors from '@/components/ValidationErrors';
import { ThemeColor } from '@/utils/enums';
import { str } from '@/utils/helpers';

const ThemeSettings = ({ settings }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formik = useFormik({
        initialValues: {
            dark_mode: settings.dark_mode.value,
            color: settings.color.value,
        },
        validateOnChange: true,
        onSubmit: values => {
            console.log(formik.touched);
            Inertia.put(route(`dashboard.users.settings.update`,), values, {
                    preserveState: false,
                    onBefore: () => setIsLoading(true),
                    onSuccess: () => formik.resetForm(),
                    onError: errors => setErrors(errors),
                    onFinish: () => setIsLoading(false)
                }
            );
        }
    });

    return (
        <Paper className={'mb-3'}>
            <Card.Header className={'d-flex justify-content-between align-items-center'}>
                <h5 className={'mb-0'}>Theme Settings</h5>
                {
                    formik.dirty &&
                    <LoadingButton loading={isLoading} onClick={() => formik.handleSubmit()}><Save/></LoadingButton>
                }
            </Card.Header>

            <ValidationErrors errors={errors}/>

            <Grid component={Card.Body} container spacing={2}>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel name={'dark_mode'} control={<Switch checked={formik.values.dark_mode}/>}
                                          label="Enable dark mode" onChange={formik.handleChange}/>
                    </FormGroup>
                    <div className={'border-dashed-bottom'}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField select fullWidth label={'Main Color'} name={'color'} value={formik.values.color}
                               onChange={formik.handleChange}
                               error={formik.touched.color && Boolean(formik.errors.color)}
                               helperText={formik.touched.color && formik.errors.color}>
                        {
                            Object.keys(ThemeColor).map((color, i) => (
                                <MenuItem key={`color-${i}`} value={ThemeColor[color]}>
                                    <ColorDot color={ThemeColor[color]}/> {str.headline(color)}
                                </MenuItem>
                            ))
                        }
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
