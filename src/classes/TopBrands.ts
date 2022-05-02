import axios from 'axios'

import URL from 'consts/url'
import {
    BrandData,
    BrandDataOrigin,
    ModelData,
    ModelDataOrigin
} from "types/searchTypes"

/** Minimum number of ads to consider brand as a TOP_BRAND
 * 
 * Filters 3/4 of brands that do not or almost do not persists on the market.
 * It saves a lot of irrelevant requests.
 */
const MIN_TOP_BRAND_COUNT = 100;

/** Minimum number of ads to consider model as a TOP_MODEL
 * 
 * Filters a 3/4 of models of TOP_BRANDS.
 * It saves a lot of irrelevant requests.
 */
const MIN_MODEL_COUNT = 30;

export default class TopBrands {
    async get(): Promise<BrandData[]> {
        const { data }: { data: BrandDataOrigin[] } = await axios.get(URL.brands)

        const brands: BrandData[] = data
            .filter(({ count, name, country }) => {
                if (count < MIN_TOP_BRAND_COUNT) return false
                if ([643, 804].includes(country)) return false
                if (["MAN", "DAF", "Iveco"].includes(name)) return false

                return true
            })
            .map(({ name, count, value }) => ({ name, count, id: value, models: [] }))


        for (let i = 0; i < brands.length; i++) {
            const { id } = brands[i]
            const models = await this.getModels(id.toString())
            brands[i].models = models
        }

        return brands.filter(brand => brand.models?.length)
    }

    private async getModels(brandId: string): Promise<ModelData[]> {
        const { data: models }: { data: ModelDataOrigin[] } = await axios.get(URL.models.replace('{brandId}', brandId))

        return models
            .filter(({ isGroup, count }) => {
                if (count < MIN_MODEL_COUNT) return false
                if (isGroup) return false

                return true
            })
            .map(model => ({
                name: model.name,
                id: model.value,
                count: model.count,
            }))
    }
}
