import { useEffect, Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';

import { FormValues } from 'types/filters';
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
    const formik = useFormik<FormValues>({
        initialValues: {
            price_do: '10000',
            engineVolumeTo: undefined,
            's_yers': undefined,
            fuelType: [],
            state: undefined,
            city: undefined,
        },
        onSubmit: () => { }
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const { fuelType, s_yers, engineVolumeTo, price_do, state, city } = formik.values;

            const filters: CustomParams = {}

            fuelType.forEach((type, i) => filters[`type[${i}]` as FuelKeys] = type)
            if (price_do) filters.price_do = parseInt(price_do)
            if (s_yers) filters['s_yers[0]'] = parseInt(s_yers)
            if (engineVolumeTo) filters.engineVolumeTo = parseInt(engineVolumeTo)
            if (state && city) {
                filters['state[0]'] = parseInt(state)
                filters['city[0]'] = parseInt(city)
            }

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
