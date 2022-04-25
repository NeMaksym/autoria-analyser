import { useFormik } from 'formik';
import { useEffect } from 'react';

import Filters from 'components/Filters/Filters';


const FiltersContainer = ({ filters, setFilters }) => {
    const formik = useFormik({
        initialValues: filters,
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilters(formik.values)
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [formik.values, setFilters])

    return <Filters formik={formik} />
}

export default FiltersContainer;
