import axios from "axios";

import REGIONS from 'consts/regions';
import SearchParams from "classes/SearchParams";
import { Gearbox, ByYearRes, ByRegionRes, ByBrandRes } from "types/searchTypes";

class Search {
    // private searchUrl = 'https://auto.ria.com/demo/bu/searchPage/search/indexes/auto?'
    private searchUrl = 'http://localhost:8000/demo/bu/searchPage/search/indexes/auto?'
    // private brandsUrl = 'https://auto.ria.com/demo/api/categories/1/brands/_active/_with_count/_with_country?langId=2'
    private brandsUrl = 'http://localhost:8000/demo/api/categories/1/brands/_active/_with_count/_with_country?langId=2'

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
                    .get(this.searchUrl, { params: baseParams.values })
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
                        .get(this.searchUrl, { params: filterParams.values })
                        .then(({ data }) => {
                            res[year].countFilterA = data.result.search_result_common.count
                        })
                )

                filterParams.setGearbox(Gearbox.mechanic)

                requests.push(
                    axios
                        .get(this.searchUrl, { params: filterParams.values })
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
                    .get(this.searchUrl, { params: baseParams.values })
                    .then(({ data }) => {
                        res[regionId].countBase = data.result.search_result_common.count
                    })
            )

            filterParams
                .setRegion(regionId)
                .setGearbox(Gearbox.auto)

            requests.push(
                axios
                    .get(this.searchUrl, { params: filterParams.values })
                    .then(({ data }) => {
                        res[regionId].countFilterA = data.result.search_result_common.count
                    })
            )

            filterParams.setGearbox(Gearbox.mechanic)

            requests.push(
                axios
                    .get(this.searchUrl, { params: filterParams.values })
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
            .get(this.brandsUrl)
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
                    .get(this.searchUrl, { params: filterParams.values })
                    .then(({ data }) => {
                        res[brandId].countFilterA = data.result.search_result_common.count
                        res[brandId].name = data.result.active_marka.name
                    })
            )

            filterParams.setGearbox(Gearbox.mechanic)

            requests.push(
                axios
                    .get(this.searchUrl, { params: filterParams.values })
                    .then(({ data }) => {
                        res[brandId].countFilterM = data.result.search_result_common.count
                    })
            )
        })

        await axios.all(requests)

        return res
    }
}

export default Search
