import axios from 'axios'

import URL from 'consts/url'
import {
    BrandData,
    BrandDataOrigin,
    ModelData,
    ModelDataOrigin
} from "types/searchTypes"

/** Minimum number of cars to consider brand as a TOP_BRAND
 * 
 * Filters 3/4 of brands that do not or almost do not persists on the market.
 * It saves a lot of irrelevant requests
 */
const MIN_TOP_BRAND_COUNT = 100;

export default class TopBrands {
    private async get(): Promise<BrandData[]> {
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

        return brands
    }

    private async getModels(brandId: string): Promise<ModelData[]> {
        const { data: models }: { data: ModelDataOrigin[] } = await axios.get(URL.models.replace('{brandId}', brandId))

        return models
            .filter(model => !model.isGroup)
            .map(model => ({
                name: model.name,
                id: model.value,
            }))
    }
}

// new TopBrands().get()
