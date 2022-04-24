import { useFormik } from 'formik';
import { useEffect } from 'react';

import Filters from './Filters';


const FiltersContainer = () => {
    const formik = useFormik({
        initialValues: {
            priceTo: 10000,
            engineTo: '',
            yearFrom: '',
            compareGearboxes: false,
        },
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // TODO: Search
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [formik.values])

    return <Filters formik={formik} />
}

export default FiltersContainer;
