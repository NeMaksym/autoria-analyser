import { FuelType } from "./searchParamsTypes"

export enum FormValueKeys {
    price_do = 'price_do',
    engineVolumeTo = 'engineVolumeTo',
    s_yers = 's_yers',
    fuelType = 'fuelType'
}

export interface FormValues {
    [FormValueKeys.price_do]: string | undefined
    [FormValueKeys.engineVolumeTo]: string | undefined
    [FormValueKeys.s_yers]: string | undefined
    [FormValueKeys.fuelType]: FuelType[]
}
