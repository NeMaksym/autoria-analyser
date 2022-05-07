import { Gearbox } from "types/searchParamsTypes";

const getSearchLink = (
    year: number,
    brandId: number,
    modelId: number,
    price: number,
    gearbox: Gearbox
) => {
    const gearboxQuery = gearbox === Gearbox.mechanic
        ? 'gearbox.id[0]=1'
        : 'gearbox.id[0]=2&gearbox.id[1]=3&gearbox.id[2]=4&gearbox.id[3]=5'

    return `https://auto.ria.com/search/?indexName=auto,order_auto,newauto_search&brand.id[0]=${brandId}&model.id[0]=${modelId}&year[0].gte=${year}&categories.main.id=1&country.import.usa.not=-1&price.USD.lte=${price}&price.currency=1&sort[0].order=price.asc&abroad.not=0&custom.not=1&size=10&${gearboxQuery}`
}

export default getSearchLink;
