import axios from "axios";

import URL from "consts/url";
import REGIONS from 'consts/regions';
import TOP_BRANDS from 'consts/topBrands';
import SearchParams from "classes/SearchParams";
import getTopBrandById from "utils/getTopBrandById";
import {
    Gearbox,
    ByYearRes,
    ByRegionRes,
    ByBrandRes,
    ModelDataOrigin,
    BrandData,
    CarOption
} from "types/searchTypes";
class Search {
    async byYear(filterParams: SearchParams): Promise<ByYearRes> {
        const requests: Promise<void>[] = []

        const baseParams = new SearchParams()
        const filterYearFrom = filterParams.values["s_yers[0]"]

        const res: ByYearRes = {}

        for (let year = 2000; year < 2023; year++) {
            res[year] = {
                countBase: 0,
                countFilterA: 0,
                countFilterM: 0,
            }

            baseParams.setYear(year, year);

            requests.push(
                axios
                    .get(URL.search, { params: baseParams.values })
                    .then(({ data }) => {
                        res[year].countBase = data.result.search_result_common.count
                    })
            )

            if (!filterYearFrom || year >= filterYearFrom) {
                filterParams
                    .setGearbox(Gearbox.auto)
                    .setYear(year, year)

                requests.push(
                    axios
                        .get(URL.search, { params: filterParams.values })
                        .then(({ data }) => {
                            res[year].countFilterA = data.result.search_result_common.count
                        })
                )

                filterParams.setGearbox(Gearbox.mechanic)

                requests.push(
                    axios
                        .get(URL.search, { params: filterParams.values })
                        .then(({ data }) => {
                            res[year].countFilterM = data.result.search_result_common.count
                        })
                )
            }
        }

        await axios.all(requests);

        return res;
    }

    async byRegion(filterParams: SearchParams): Promise<ByRegionRes> {
        const baseParams = new SearchParams()

        const res: ByRegionRes = {}
        const requests: Promise<void>[] = []

        Object.keys(REGIONS).forEach(regionId => {
            res[regionId] = {
                countBase: 0,
                countFilterA: 0,
                countFilterM: 0,
            }

            baseParams.setRegion(regionId)

            requests.push(
                axios
                    .get(URL.search, { params: baseParams.values })
                    .then(({ data }) => {
                        res[regionId].countBase = data.result.search_result_common.count
                    })
            )

            filterParams
                .setRegion(regionId)
                .setGearbox(Gearbox.auto)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => {
                        res[regionId].countFilterA = data.result.search_result_common.count
                    })
            )

            filterParams.setGearbox(Gearbox.mechanic)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => {
                        res[regionId].countFilterM = data.result.search_result_common.count
                    })
            )
        })

        await axios.all(requests)

        return res
    }

    async byBrand(filterParams: SearchParams): Promise<ByBrandRes> {
        const brandIDs: number[] = []
        const res: ByBrandRes = {}

        await axios
            .get(URL.brands)
            .then(({ data }) => {
                data.forEach(({ value: brandId }: { value: number }) => {
                    brandIDs.push(brandId)
                    res[brandId] = {
                        name: '',
                        countFilterA: 0,
                        countFilterM: 0,
                    }
                })
            })

        const requests: Promise<void>[] = []


        brandIDs.forEach(brandId => {
            filterParams
                .setBrand(brandId)
                .setGearbox(Gearbox.auto)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => {
                        res[brandId].countFilterA = data.result.search_result_common.count
                        res[brandId].name = data.result.active_marka.name
                    })
            )

            filterParams.setGearbox(Gearbox.mechanic)

            requests.push(
                axios
                    .get(URL.search, { params: filterParams.values })
                    .then(({ data }) => {
                        res[brandId].countFilterM = data.result.search_result_common.count
                    })
            )
        })

        await axios.all(requests)

        return res
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

    private async countYears(searchParams: SearchParams) {
        const requests = [];
        const years: { year: number, count: number }[] = []

        for (let year = 2000; year < 2023; year++) {
            searchParams.setYear(year, year)

            const request = axios
                .get(URL.search, { params: searchParams.values })
                .then(({ data }) => years.push({ year, count: data.result.search_result_common.count }))

            requests.push(request)
        }

        await axios.all(requests)

        return years
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
