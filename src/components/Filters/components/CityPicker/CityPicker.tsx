import { FormikValues } from "formik";
import { Dispatch, SetStateAction } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

import { FormValueKeys } from "types/filters";
import { City } from './CityPickerContainer';

interface Props {
    open: boolean
    formik: FormikValues
    setOpen: Dispatch<SetStateAction<boolean>>
    options: readonly City[]
    loading: boolean
    inputValue: string
    setInptutValue: Dispatch<SetStateAction<string>>
}

const CityPicker = ({
    open,
    formik,
    setOpen,
    options,
    loading,
    inputValue,
    setInptutValue
}: Props) => {
    return (
        <Autocomplete
            inputValue={inputValue}
            onChange={(_e, value) => {
                if (!value) {
                    formik.setFieldValue(FormValueKeys.state, undefined)
                    formik.setFieldValue(FormValueKeys.city, undefined)
                } else {
                    formik.setFieldValue(FormValueKeys.state, value.state)
                    formik.setFieldValue(FormValueKeys.city, value.value)
                }
            }}
            onInputChange={(_e, value) => {
                setInptutValue(value)
                if (value.length && !open) setOpen(true)
                if (!value.length && open) setOpen(false)
            }}
            sx={{ width: { xs: "100%", sm: '330px' } }}
            open={open}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Місто"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.value}>
                    {option.name}
                </li>
            )}
        />
    )
}

export default CityPicker;