import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Paper,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField
} from "@mui/material";

const Filters = ({ formik }) => {
    return (
        <Paper>
            <Grid
                container
                spacing={1}
                sx={{ p: '16px' }}
            >
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel>Price to</InputLabel>
                                <OutlinedInput
                                    label="Price to"
                                    type="number"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={formik.values.price_do}
                                    onChange={e => formik.setFieldValue('price_do', e.target.value)}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <TextField
                                sx={{ width: 100 }}
                                label="Engine to"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.engineVolumeTo}
                                onChange={e => formik.setFieldValue('engineVolumeTo', e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                sx={{ width: 100 }}
                                label="Year from"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values['s_yers[0]']}
                                onChange={e => formik.setFieldValue('s_yers[0]', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            name="compareGearboxes"
                            control={<Checkbox checked={formik.values.compareGearboxes} />}
                            label="Compare A to M"
                            onChange={() => formik.setFieldValue('compareGearboxes', !formik.values.compareGearboxes)}
                        />
                        <FormControlLabel disabled control={<Checkbox checked />} label="Default filters" />
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper >
    )
};

export default Filters;
