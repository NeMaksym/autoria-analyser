export enum Gearbox {
    mechanic = 'M',
    auto = 'A',
    none = 'General',
}

export interface ByYearRes {
    [year: string]: {
        countBase: number
        countFilterA: number
        countFilterM: number
    }
}

export interface ByRegionRes {
    [regionId: string]: {
        countBase: number
        countFilterA: number
        countFilterM: number
    }
}

export interface ByBrandRes {
    [brand: string]: {
        name: string
        countFilterA: number
        countFilterM: number
    }
}

export interface CarOption {
    year: number
    brandName: string
    modelName: string
    count: number
}

export interface ModelDataOrigin {
    name: string
    value: number
    count: number
    isGroup: 0 | 1
    parentId: number
    countFilterA: number
    countFilterM: number
}

export interface ModelData {
    name: string,
    id: number,
    count?: number,
}

export interface BrandDataOrigin {
    count: number
    name: string
    value: number
    country: number
}
export interface BrandData {
    name: string,
    id: number,
    count: number,
    models?: ModelData[]
}
