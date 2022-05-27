import axios from 'axios';
import { FormikValues } from 'formik';
import { useState, useEffect } from 'react';

import URL from 'consts/url';
import CityPicker from './CityPicker';

export interface City {
    name: string
    value: string
    state: string
}

const CityPcikerContainer = ({ formik }: FormikValues) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly City[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let isCanceled = false

        if (!inputValue.length) return;

        (async () => {
            setLoading(true);

            const searchUrl = URL.cities.replace('{searchParam}', inputValue)
            await axios.get(searchUrl)
                .finally(() => setLoading(false))
                .then(res => {
                    if (!isCanceled) setOptions(res.data)
                })
                .catch(_e => setOptions([]))
        })();

        return () => { isCanceled = true };
    }, [inputValue]);

    return <CityPicker
        open={open}
        formik={formik}
        setOpen={setOpen}
        options={options}
        loading={loading}
        inputValue={inputValue}
        setInptutValue={setInputValue}
    />
}

export default CityPcikerContainer;
