import _ from 'lodash';
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
        const brand = getTopBrandById(brandId)

        // #1. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const modelsM = await this.countBrandModels(filterParams, brand, controller)

        // #2. Count auto gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.auto)
        const modelsA = await this.countBrandModels(filterParams, brand, controller)

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

        const MIN_CARS_PER_YEAR = 40
        const MIN_MODEL_COUNT = 10

        const brands = _.cloneDeep(TOP_BRANDS)
        const carOptions: CarOption[] = []

        // #1. Prepare params
        filterParams
            .removeYear()
            .setGearbox(gearbox)

        // #2. Find top 5 freshiest years that have {MIN_CARS_PER_YEAR}
        const years = await this.countYears(filterParams, controller)

        const topFiveYears = _(years)
            .filter(yr => yr.count >= MIN_CARS_PER_YEAR)
            .sortBy('year')
            .takeRight(5)
            .value()

        // #3. Run from last year to first
        for (const { year } of topFiveYears) {
            filterParams.setYear(year)

            // #4. On each year run through top brands
            const brandRequests = brands.map(async (brand) => {

                // #5. Count models for each brand
                const models = await this.countBrandModels(filterParams, brand, controller)

                models.forEach(model => {
                    // If model has lees than {MIN_MODEL_COUNT} it makes no sense to fetch it with the following years. So just remove it
                    if (model.count < MIN_MODEL_COUNT && brand.models) {
                        _.remove(brand.models, item => _.isMatch(item, { id: model.id }))
                        return
                    }

                    // Remove last year option if has the same count value
                    _.remove(carOptions, option => _.isMatch(option, {
                        year: year - 1,
                        brandId: brand.id,
                        modelId: model.id,
                        count: model.count
                    }))

                    // Add option to the list of options
                    carOptions.push({
                        year,
                        brandId: brand.id,
                        brandName: brand.name,
                        modelId: model.id,
                        modelName: model.name,
                        count: model.count,
                    })
                })
            })

            // On each year run brands requests simultaniusly
            await Promise.all(brandRequests)
        }

        return carOptions
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
        brand: BrandData,
        controller: AbortController,
    ): Promise<ModelData[]> {

        const requests: Promise<void>[] = []
        const models: ModelData[] = []

        brand.models?.forEach(({ name, id: modelId }) => {
            searchParams.setBrand(brand.id, modelId)

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
