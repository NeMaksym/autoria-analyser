import axios from "axios";

import URL from "consts/url";
import REGIONS from 'consts/regions';
import TOP_BRANDS from 'consts/topBrands';
import SearchParams from "classes/SearchParams";
import { Gearbox } from 'types/searchParamsTypes';
import getTopBrandById from "utils/getTopBrandById";
import {
    YearData,
    RegionData,
    BrandData,
    CarOption,
    ModelData,
} from "types/searchTypes";

class Search {
    async byYear(
        filterParams: SearchParams,
        controller: AbortController,
    ): Promise<YearData[]> {

        const yearFrom = filterParams.values["s_yers[0]"]

        // #1. Count cars by years in general
        const baseParams = new SearchParams()
        const yearsBase = await this.countYears(baseParams, controller)

        // #2. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const yearsM = await this.countYears(filterParams, controller, yearFrom)

        // #3. Count automat gearbox cars, based on filters
        filterParams.setGearbox(Gearbox.auto)
        const yearsA = await this.countYears(filterParams, controller, yearFrom)

        // #4. Combine results
        return yearsBase.map(yearBase => ({
            ...yearBase,
            countA: yearsA.find(yearA => yearA.year === yearBase.year)?.count || 0,
            countM: yearsM.find(yearM => yearM.year === yearBase.year)?.count || 0,
        }))
    }

    async byRegion(
        filterParams: SearchParams,
        controller: AbortController,
    ): Promise<RegionData[]> {

        // #1. Count cars by region in general
        const baseParams = new SearchParams()
        const regionsBase = await this.countRegions(baseParams, controller)

        // #2. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const regionsM = await this.countRegions(filterParams, controller)

        // #3. Count automat gearbox cars, based on filters
        filterParams.setGearbox(Gearbox.auto)
        const regionsA = await this.countRegions(filterParams, controller)

        // #4. Combine results
        return regionsBase.map(regionBase => ({
            ...regionBase,
            countA: regionsA.find(regionA => regionA.id === regionBase.id)?.count || 0,
            countM: regionsM.find(regionM => regionM.id === regionBase.id)?.count || 0,
        }))
    }

    async byBrand(
        filterParams: SearchParams,
        controller: AbortController,
    ): Promise<BrandData[]> {

        // #1. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const brandsM = await this.countTopBrands(filterParams, controller)

        // #2. Count automat gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.auto)
        const brandsA = await this.countTopBrands(filterParams, controller)

        // #3. Combine results
        return brandsM.map(brandM => {
            const countA = brandsA.find(brandA => brandA.id === brandM.id)?.count || 0

            return {
                ...brandM,
                count: brandM.count + countA,
                countM: brandM.count,
                countA,
            }
        })
    }

    async byModel(
        filterParams: SearchParams,
        brandId: number,
        controller: AbortController,
    ): Promise<ModelData[]> {

        // #1. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const modelsM = await this.countBrandModels(filterParams, brandId, controller)

        // #2. Count auto gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.auto)
        const modelsA = await this.countBrandModels(filterParams, brandId, controller)

        // #3. Combine results
        return modelsM.map(modelM => {
            const countA = modelsA.find(modelA => modelA.id === modelM.id)?.count || 0

            return {
                ...modelM,
                count: modelM.count + countA,
                countM: modelM.count,
                countA,
            }
        })
    }

    async carPicker(
        filterParams: SearchParams,
        gearbox: Gearbox,
        controller: AbortController,
    ): Promise<CarOption[]> {

        const YEARS_TO_COUNT = 5
        const MIN_CARS_PER_YEAR = 40  // Do not account for years that have less
        const MIN_MODEL_COUNT = 10    // Do not account for models that have less

        const carOptions: CarOption[] = []

        // #1. Prepare params
        filterParams
            .removeYear()
            .setGearbox(gearbox)

        // #2. Find top {YEARS_TO_COUNT} freshiest years, based on filters
        const years = await this.countYears(filterParams, controller)

        const topFiveYears = years
            .filter(yearData => yearData.count >= MIN_CARS_PER_YEAR)
            .sort((a, b) => b.year - a.year)
            .filter((_item, i) => i < YEARS_TO_COUNT)
            .map(({ year }) => year)

        // #3. Find brands for each year
        for (let i = 0; i < topFiveYears.length; i++) {
            const year = topFiveYears[i]

            filterParams.setYear(year, year)

            const brands = await this.countTopBrands(filterParams, controller)

            // #4. Find models for each brand
            for (let k = 0; k < brands.length; k++) {
                const { name: brandName, id: brandId } = brands[k]

                const models = await this.countBrandModels(filterParams, brandId, controller)

                models.map(model => {
                    // #5. Add car model to the result array
                    const prevYrValue = carOptions.find(option => (
                        option.year === year + 1 && option.brandId === brandId && option.modelId === model.id
                    ))

                    return carOptions.push({
                        year,
                        brandId,
                        brandName,
                        modelId: model.id,
                        modelName: model.name,
                        count: model.count + (prevYrValue?.count || 0),
                    })
                })
            }
        }

        // #6 Filter models belove the {MIN_MODEL_COUNT} value
        return carOptions.filter(option => option.count > MIN_MODEL_COUNT)
    }

    /** UTILS */
    private async countYears(
        searchParams: SearchParams,
        controller: AbortController,
        startFrom?: number,
    ): Promise<YearData[]> {

        const requests = [];
        const years: YearData[] = []

        for (let year = startFrom || 2000; year < 2023; year++) {
            searchParams.setYear(year, year)

            const config = {
                params: searchParams.values,
                signal: controller.signal,
            }

            const request = axios
                .get(URL.search, config)
                .then(({ data }) => {
                    years.push({
                        year,
                        count: data.result.search_result_common.count
                    })
                })

            requests.push(request)
        }

        await axios.all(requests)

        return years
    }

    private async countRegions(
        searchParams: SearchParams,
        controller: AbortController,
    ): Promise<RegionData[]> {

        const requests: Promise<void>[] = []
        const regions: RegionData[] = []

        Object.keys(REGIONS).forEach(regionId => {
            searchParams.setRegion(regionId)

            const config = {
                params: searchParams.values,
                signal: controller.signal,
            }

            const request = axios
                .get(URL.search, config)
                .then(({ data }) => {
                    regions.push({
                        id: Number(regionId),
                        name: REGIONS[regionId],
                        count: data.result.search_result_common.count
                    })
                })

            requests.push(request)
        })

        await axios.all(requests)

        return regions
    }

    private async countTopBrands(
        searchParams: SearchParams,
        controller: AbortController,
    ): Promise<BrandData[]> {

        const requests: Promise<void>[] = []
        const brands: BrandData[] = []

        TOP_BRANDS.forEach(({ name, id }) => {
            searchParams.setBrand(id)

            const config = {
                params: searchParams.values,
                signal: controller.signal,
            }

            const request = axios
                .get(URL.search, config)
                .then(({ data }) => {
                    brands.push({
                        name,
                        id,
                        count: data.result.search_result_common.count,
                    })
                })

            requests.push(request)
        })

        await axios.all(requests)

        return brands
    }

    private async countBrandModels(
        searchParams: SearchParams,
        brandId: number,
        controller: AbortController,
    ): Promise<ModelData[]> {

        const brand = getTopBrandById(brandId)

        const requests: Promise<void>[] = []
        const models: ModelData[] = []

        brand.models?.forEach(({ name, id: modelId }) => {
            searchParams.setBrand(brandId, modelId)

            const config = {
                params: searchParams.values,
                signal: controller.signal,
            }

            const request = axios
                .get(URL.search, config)
                .then(({ data }) => {
                    models.push({
                        id: modelId,
                        name,
                        count: data.result.search_result_common.count
                    })
                })

            requests.push(request)
        })

        await axios.all(requests)

        return models;
    }
}

export default Search
