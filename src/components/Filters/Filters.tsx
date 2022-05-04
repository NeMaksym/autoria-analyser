import { Dispatch, SetStateAction } from 'react';
import { FormikValues } from 'formik';
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
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FuelType } from 'types/searchParamsTypes';

const FUEL_LABELS = {
    1: 'Бензин',
    2: 'Дизель',
    3: 'Газ',
    4: 'Газ/Бензин',
    5: 'Гібрид',
    6: 'Електо',
}

interface Props {
    formik: FormikValues
    compareGearboxes: boolean
    setCompareGearboxes: Dispatch<SetStateAction<boolean>>
}

const Filters = ({ formik, compareGearboxes, setCompareGearboxes }: Props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Paper sx={{ p: 4 }} elevation={4}>
            <Grid container spacing={2}>
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
                    <ToggleButtonGroup
                        orientation={matches ? 'horizontal' : 'vertical'}
                        color="primary"
                        value={formik.values.fuelType}
                        onChange={(_e, newTypes) => formik.setFieldValue('fuelType', newTypes)}
                    >
                        {
                            Object.values(FuelType).map(typeId => (
                                <ToggleButton
                                    key={typeId}
                                    value={typeId}
                                    children={FUEL_LABELS[typeId]}
                                />
                            ))
                        }
                    </ToggleButtonGroup>
                </Grid>

                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            name="compareGearboxes"
                            control={<Checkbox checked={compareGearboxes} />}
                            onChange={() => setCompareGearboxes(!compareGearboxes)}
                            label={
                                <>
                                    Показати співвідношення механіки та автомату
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
                            control={<Checkbox checked sx={{ pb: 0 }} />}
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
