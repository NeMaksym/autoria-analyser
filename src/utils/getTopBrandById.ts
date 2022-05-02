import TOP_BRANDS from "consts/topBrands"

const getTopBrandById = (brandId: number) => {
    const brand = TOP_BRANDS.find(brand => brand.id === brandId)

    if (!brand?.models) return console.error("Provided 'brandId' is missing in TOP_BRANDS") as never

    return brand
}

export default getTopBrandById
