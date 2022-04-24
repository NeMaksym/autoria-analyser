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
                                    value={formik.values.priceTo}
                                    onChange={e => formik.setFieldValue('priceTo', e.target.value)}
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
                                value={formik.values.engineTo}
                                onChange={e => formik.setFieldValue('engineTo', e.target.value)}
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
                                value={formik.values.yearFrom}
                                onChange={e => formik.setFieldValue('yearFrom', e.target.value)}
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
