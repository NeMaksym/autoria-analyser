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

const Filters = ({ formik, compareGearboxes, setCompareGearboxes }) => {
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
                                <InputLabel>Ціна до</InputLabel>
                                <OutlinedInput
                                    label="Ціна до"
                                    type="number"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    value={formik.values.price_do}
                                    onChange={e => formik.setFieldValue('price_do', e.target.value)}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl sx={{ width: 100 }}>
                                <InputLabel>Двигун до</InputLabel>
                                <OutlinedInput
                                    label="Двигун до"
                                    type="number"
                                    endAdornment={<InputAdornment position="end">л.</InputAdornment>}
                                    value={formik.values.engineVolumeTo}
                                    onChange={e => formik.setFieldValue('engineVolumeTo', e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                sx={{ width: 100 }}
                                label="Рік від"
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
                            control={<Checkbox checked={compareGearboxes} />}
                            label="Показати розподілення АКПП до МКПП"
                            onChange={() => setCompareGearboxes(!compareGearboxes)}
                        />
                        <FormControlLabel disabled control={<Checkbox checked />} label="Фільтри за замовчуванням" />
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper >
    )
};

export default Filters;
