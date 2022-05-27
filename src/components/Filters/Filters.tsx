import { Dispatch, SetStateAction } from 'react';
import { FormikValues } from 'formik';
import { useMatch } from "react-router-dom";
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
    Select,
    MenuItem,
    ListItemText,
    SelectChangeEvent,
    Divider
} from "@mui/material";

import Pages from 'consts/pages';
import { FormValueKeys } from 'types/filters';
import { FuelType } from 'types/searchParamsTypes';
import { CityPicker } from 'components/Filters/components';

const FUEL_LABELS = {
    1: 'Бензин',
    2: 'Дизель',
    3: 'Газ',
    4: 'Газ/Бензин',
    5: 'Гібрид',
    6: 'Електо',
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        },
    },
};

interface Props {
    formik: FormikValues
    compareGearboxes: boolean
    setCompareGearboxes: Dispatch<SetStateAction<boolean>>
    showRegionGraph: boolean
    setShowRegionGraph: Dispatch<SetStateAction<boolean>>
}

// TODO: Add "body form" filter (don't forget to update carpicker link)
const Filters = ({
    formik,
    compareGearboxes,
    setCompareGearboxes,
    showRegionGraph,
    setShowRegionGraph
}: Props) => {
    let isCarpickerPage = Boolean(useMatch(Pages.carpicker));

    return (
        <Paper sx={{ p: 4, pb: 2 }} elevation={4}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm="auto">
                    <FormControl sx={{ width: { xs: '100%', sm: '200px' } }}>
                        <InputLabel>Ціна до</InputLabel>
                        <OutlinedInput
                            label="Ціна до"
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            value={formik.values[FormValueKeys.price_do]}
                            onChange={e => formik.setFieldValue(FormValueKeys.price_do, e.target.value)}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm="auto" container spacing={2}>
                    <Grid item>
                        <FormControl sx={{ width: 115 }}>
                            <InputLabel>Об’єм до</InputLabel>
                            <OutlinedInput
                                label="Об’єм до"
                                type="number"
                                inputProps={{
                                    min: 0
                                }}
                                endAdornment={<InputAdornment position="end">л.</InputAdornment>}
                                value={formik.values[FormValueKeys.engineVolumeTo]}
                                onChange={e => formik.setFieldValue(FormValueKeys.engineVolumeTo, e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            sx={{ width: 115 }}
                            disabled={isCarpickerPage}
                            variant={isCarpickerPage ? 'filled' : 'outlined'}
                            label="Рік від"
                            type="number"
                            inputProps={{
                                min: 2000
                            }}
                            value={formik.values[FormValueKeys.s_yers]}
                            onChange={e => formik.setFieldValue(FormValueKeys.s_yers, e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <FormControl sx={{ minWidth: { xs: "100%", sm: '330px' } }}>
                        <InputLabel>Тип палива</InputLabel>
                        <Select
                            multiple
                            value={formik.values[FormValueKeys.fuelType]}
                            onChange={(e: SelectChangeEvent<FuelType[]>) => {
                                formik.setFieldValue(FormValueKeys.fuelType, e.target.value)
                            }}
                            input={<OutlinedInput label="Тип палива" />}
                            renderValue={(selected: FuelType[]) => (
                                selected.map(typeId => FUEL_LABELS[typeId]).join(', ')
                            )}
                            MenuProps={MenuProps}
                        >
                            {
                                Object.values(FuelType).map(typeId => (
                                    <MenuItem key={typeId} value={typeId}>
                                        <Checkbox checked={formik.values.fuelType.indexOf(typeId) > -1} />
                                        <ListItemText primary={FUEL_LABELS[typeId]} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <CityPicker formik={formik} />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                    <Divider />
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
                            name="compareGearboxes"
                            control={<Checkbox checked={showRegionGraph} />}
                            onChange={() => setShowRegionGraph(!showRegionGraph)}
                            label="Показати графік за регіоном"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default Filters;
