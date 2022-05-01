import InfoIcon from '@mui/icons-material/Info';
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
    TextField,
    Tooltip,
} from "@mui/material";

const Filters = ({ formik, compareGearboxes, setCompareGearboxes }) => {
    return (
        <Paper sx={{ p: "16px" }} elevation={4}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <FormControl sx={{ width: 200 }}>
                                <InputLabel shrink>Ціна до</InputLabel>
                                <OutlinedInput
                                    notched
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
                                <InputLabel shrink>Двигун до</InputLabel>
                                <OutlinedInput
                                    notched
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
                            onChange={() => setCompareGearboxes(!compareGearboxes)}
                            label={
                                <>
                                    Показати розподілення АКПП до МКПП
                                    <Tooltip
                                        disableFocusListener
                                        disableTouchListener
                                        title="Відфільтрувавши оголошення за вказаними параметрами,
                                         показує скільки з них на автоматі, а скільки на механіці"
                                    >
                                        <InfoIcon fontSize="small" sx={{ fontSize: 16, ml: '2px' }} />
                                    </Tooltip>
                                </>
                            }
                        />

                        <FormControlLabel
                            disabled
                            control={<Checkbox checked />}
                            label={
                                <>
                                    Фільтри за замовчуванням
                                    <Tooltip
                                        disableFocusListener
                                        disableTouchListener
                                        title={
                                            <>
                                                • Тільки вживані авто <br />
                                                • Легкові автомобілі <br />
                                                • З фото <br />
                                                • Не показувати продані <br />
                                                • Виключити Укр і Рос марки (ВАЗ, ЗАЗ) <br />
                                            </>
                                        }
                                    >
                                        <InfoIcon fontSize="small" sx={{ fontSize: 16, ml: '2px' }} />
                                    </Tooltip>
                                </>
                            }
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper >
    )
};

export default Filters;
