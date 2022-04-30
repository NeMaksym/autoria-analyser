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

export interface ModelData {
    name: string
    value: number
    count: number
    isGroup: 0 | 1
    parentId: number
    countFilterA: number
    countFilterM: number
}
