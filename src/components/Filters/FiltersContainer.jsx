import { useFormik } from 'formik';
import { useEffect } from 'react';

import Filters from 'components/Filters/Filters';


const FiltersContainer = ({ filters, setFilters, compareGearboxes, setCompareGearboxes }) => {
    const formik = useFormik({
        initialValues: filters,
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilters(formik.values)
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [formik.values, setFilters])

    return (
        <Filters
            formik={formik}
            compareGearboxes={compareGearboxes}
            setCompareGearboxes={setCompareGearboxes}
        />
    )
}

export default FiltersContainer;
