import { useEffect, Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { omit } from 'lodash'

import Filters from 'components/Filters/Filters';
import { FuelKeys } from 'types/searchParamsTypes';
import { CustomParams } from 'types/searchParamsTypes';


interface Props {
    setFilters: Dispatch<SetStateAction<CustomParams>>
    compareGearboxes: boolean
    setCompareGearboxes: Dispatch<SetStateAction<boolean>>
    showRegionGraph: boolean
    setShowRegionGraph: Dispatch<SetStateAction<boolean>>
}

const FiltersContainer = ({
    setFilters,
    compareGearboxes,
    setCompareGearboxes,
    showRegionGraph,
    setShowRegionGraph
}: Props) => {
    const formik = useFormik({
        initialValues: {
            price_do: 10000,
            engineVolumeTo: undefined,
            's_yers[0]': undefined,
            fuelType: []
        },
        onSubmit: () => { }
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filters: CustomParams = {
                ...omit(formik.values, 'fuelType')
            }

            formik.values.fuelType.forEach((type, i) => {
                filters[`type[${i}]` as FuelKeys] = type
            })

            setFilters(filters)
        }, 1500)

        return () => clearTimeout(delayDebounceFn)
    }, [formik.values, setFilters])

    return (
        <Filters
            formik={formik}
            compareGearboxes={compareGearboxes}
            setCompareGearboxes={setCompareGearboxes}
            showRegionGraph={showRegionGraph}
            setShowRegionGraph={setShowRegionGraph}
        />
    )
}

export default FiltersContainer;
