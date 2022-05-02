import axios from "axios";

import URL from "consts/url";
import REGIONS from 'consts/regions';
import TOP_BRANDS from 'consts/topBrands';
import SearchParams from "classes/SearchParams";
import getTopBrandById from "utils/getTopBrandById";
import {
    Gearbox,
    YearData,
    RegionData,
    ModelDataOrigin,
    BrandData,
    CarOption,
} from "types/searchTypes";

class Search {
    async byYear(filterParams: SearchParams): Promise<YearData[]> {
        const yearFrom = filterParams.values["s_yers[0]"]

        // #1. Count cars by years in general
        const baseParams = new SearchParams()
        const yearsBase = await this.countYears(baseParams)

        // #2. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const yearsM = await this.countYears(filterParams, yearFrom)

        // #3. Count automat gearbox cars, based on filters
        filterParams.setGearbox(Gearbox.auto)
        const yearsA = await this.countYears(filterParams, yearFrom)

        // #4. Combine results
        return yearsBase.map(yearBase => ({
            ...yearBase,
            countA: yearsA.find(yearA => yearA.year === yearBase.year)?.count || 0,
            countM: yearsM.find(yearM => yearM.year === yearBase.year)?.count || 0,
        }))
    }

    async byRegion(filterParams: SearchParams): Promise<RegionData[]> {
        // #1. Count cars by region in general
        const baseParams = new SearchParams()
        const regionsBase = await this.countRegions(baseParams)

        // #2. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const regionsM = await this.countRegions(filterParams)

        // #3. Count automat gearbox cars, based on filters
        filterParams.setGearbox(Gearbox.auto)
        const regionsA = await this.countRegions(filterParams)

        // #4. Combine results
        return regionsBase.map(regionBase => ({
            ...regionBase,
            countA: regionsA.find(regionA => regionA.id === regionBase.id)?.count || 0,
            countM: regionsM.find(regionM => regionM.id === regionBase.id)?.count || 0,
        }))
    }

    async byBrand(filterParams: SearchParams): Promise<BrandData[]> {
        // #1. Count mechanic gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.mechanic)
        const brandsM = await this.countTopBrands(filterParams)

        // #2. Count automat gearbox cars, based on filters 
        filterParams.setGearbox(Gearbox.auto)
        const brandsA = await this.countTopBrands(filterParams)

        // #3. Combine results
        return brandsM.map((brandM) => {
            const countA = brandsA.find(brandA => brandA.id === brandM.id)?.count || 0

            return {
                ...brandM,
                count: brandM.count + countA,
                countM: brandM.count,
                countA,
            }
        })
    }

    async byModel(filterParams: SearchParams, brandId: string): Promise<ModelDataOrigin[]> {
        const models: ModelDataOrigin[] = await axios
            .get(URL.models.replace('{brandId}', brandId))
            .then(({ data }: { data: ModelDataOrigin[] }) => data)

        const requests: Promise<void>[] = []

        models.forEach(model => {
            filterParams
                .setBrand(Number(brandId), model.value)
                .setGearbox(Gearbox.auto)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => model.countFilterA = data.result.search_result_common.count)
            )

            filterParams.setGearbox(Gearbox.mechanic)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => model.countFilterM = data.result.search_result_common.count)
            )
        })

        await axios.all(requests)

        return models
    }

    async carPicker(filterParams: SearchParams, gearbox: Gearbox): Promise<CarOption[]> {
        const MIN_CARS_PER_YEAR = 100  // Filters years that have < 100 cars
        const MIN_BRAND_COUNT = 20     // Filters brands that have < 20 cars
        const MIN_MODEL_COUNT = 10     // Filters models that have < 10 cars

        const carOptions: CarOption[] = []

        // #1. Setup gearbox
        filterParams.setGearbox(gearbox)

        // #2. Find top 5 freshiest years, based on filters
        const years = await this.countYears(filterParams)

        const topFiveYears = years
            .filter(yearData => yearData.count >= MIN_CARS_PER_YEAR)
            .sort((a, b) => b.year - a.year)
            .filter((_item, i) => i < 5)
            .map(({ year }) => year)

        // #3. Find and filter brands for each year
        for (let i = 0; i < topFiveYears.length; i++) {
            const year = topFiveYears[i]

            filterParams.setYear(year, year)

            const brands = await this.countTopBrands(filterParams)
            const brandsOverLimit = brands.filter(brand => brand.count >= MIN_BRAND_COUNT)

            // #4. Find and filter model for each brand
            for (let k = 0; k < brandsOverLimit.length; k++) {
                const { name: brandName, id: brandId } = brandsOverLimit[k]

                const models = await this.countBrandModels(filterParams, brandId)

                models
                    .filter(model => model.count >= MIN_MODEL_COUNT)
                    .map(model => {
                        // #5. Add car model to the result array, if it has enough proposition on the market
                        return carOptions.push({
                            year,
                            brandName,
                            modelName: model.name,
                            count: model.count,
                        })
                    })
            }
        }

        return carOptions
    }

    /** UTILS */
    private async countYears(searchParams: SearchParams, startFrom?: number): Promise<YearData[]> {
        const requests = [];
        const years: YearData[] = []

        for (let year = startFrom || 2000; year < 2023; year++) {
            searchParams.setYear(year, year)

            const request = axios
                .get(URL.search, { params: searchParams.values })
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

    private async countRegions(searchParams: SearchParams): Promise<RegionData[]> {
        const requests: Promise<void>[] = []
        const regions: RegionData[] = []

        Object.keys(REGIONS).forEach(regionId => {
            searchParams.setRegion(regionId)

            const request = axios
                .get(URL.search, { params: searchParams.values })
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

    private async countTopBrands(searchParams: SearchParams): Promise<BrandData[]> {
        const requests: Promise<void>[] = []
        const brands: BrandData[] = []

        TOP_BRANDS.forEach(({ name, id }) => {
            searchParams.setBrand(id)

            const request = axios
                .get(URL.search, { params: searchParams.values })
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

    private async countBrandModels(searchParams: SearchParams, brandId: number) {
        const brand = getTopBrandById(brandId)

        const requests: Promise<number>[] = []
        const models: { name: string, count: number }[] = []

        brand.models?.forEach(({ name, id: modelId }) => {
            searchParams.setBrand(brandId, modelId)

            const request = axios
                .get(URL.search, { params: searchParams.values })
                .then(({ data }) => models.push({ name, count: data.result.search_result_common.count }))

            requests.push(request)
        })

        await axios.all(requests)

        return models;
    }
}

export default Search
