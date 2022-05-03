export interface YearData {
    year: number
    count: number
    countM?: number
    countA?: number
}

export interface RegionData {
    id: number,
    name: string,
    count: number,
    countM?: number,
    countA?: number,
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
    name: string
    id: number
    count: number
    countA?: number
    countM?: number
}

export interface BrandDataOrigin {
    count: number
    name: string
    value: number
    country: number
}
export interface BrandData {
    name: string
    id: number
    count: number
    countA?: number
    countM?: number
    models?: ModelData[]
}
