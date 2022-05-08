import { pick } from "lodash";
import { CustomParams, FuelKeys, FuelType, Gearbox } from "types/searchParamsTypes";

const getSearchLink = (
    year: number,
    brandId: number,
    modelId: number,
    gearbox: Gearbox,
    filters: CustomParams,
) => {
    // Mandatory
    let query = [
        "indexName=auto",
        "country.origin.id[0].not=804",
        "country.origin.id[1].not=643",
        "categories.main.id=1",
        "country.import.usa.not=-1",
        "sort[0].order=price.asc",
        "abroad.not=0",
        "custom.not=1",
        "photos.all.id.gte=1",
        "size=10",
        `brand.id[0]=${brandId}`,
        `model.id[0]=${modelId}`,
        `year[0].gte=${year}`,
    ]

    switch (gearbox) {
        case Gearbox.mechanic: query.push('gearbox.id[0]=1'); break
        case Gearbox.auto: query.push('gearbox.id[0]=2&gearbox.id[1]=3&gearbox.id[2]=4&gearbox.id[3]=5'); break
    }

    // Optional
    const { price_do, engineVolumeTo } = filters

    const fuelTypes = pick(filters, Object.values(FuelKeys))
    Object.values(fuelTypes).forEach((fuelType: FuelType, i: number) => {
        query.push(`fuel.id[${i}]=${fuelType}`)
    })

    if (price_do) query.push(`price.USD.lte=${price_do}&price.currency=1`)
    if (engineVolumeTo) query.push(`engine.lte=${engineVolumeTo}`)

    return `https://auto.ria.com/search/?${query.join('&')}`
}

export default getSearchLink;
