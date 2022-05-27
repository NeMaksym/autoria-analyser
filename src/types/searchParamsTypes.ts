export enum Gearbox {
    mechanic = 'M',
    auto = 'A',
    none = 'none',
}

export enum FuelType {
    bensin = '1',
    disel = '2',
    gas = '3',
    gasBensin = '4',
    hybrid = '5',
    electro = '6'
}

export enum FuelKeys {
    'type[0]' = 'type[0]',
    'type[1]' = 'type[1]',
    'type[2]' = 'type[2]',
    'type[3]' = 'type[3]',
    'type[4]' = 'type[4]',
    'type[5]' = 'type[5]',
}

export interface Params extends CustomParams {
    /** Coundition: used */
    indexName: 'auto',

    /** Type: 1 -- cars */
    category_id: 1,

    /** With photo: 1 -- true */
    with_photo: 1,

    /** Hide saled: 2 -- true */
    saledParam: 2,

    /** Exclude country: 643 - Rus, 804 - Ukr */
    originExclude: 1,
    'brandOrigin[0]': 643,
    'brandOrigin[1]': 804,
}

export interface CustomParams {
    /** Gear: 1 - mechanic; 2-5 -- automat */
    'gearbox[0]'?: number,
    'gearbox[1]'?: number,
    'gearbox[2]'?: number,
    'gearbox[3]'?: number,

    /** Fuel */
    'type[0]'?: FuelType,
    'type[1]'?: FuelType,
    'type[2]'?: FuelType,
    'type[3]'?: FuelType,
    'type[4]'?: FuelType,
    'type[5]'?: FuelType,

    /** Price: 1 - USD */
    price_ot?: number,
    price_do?: number,
    currency?: 1,

    /** Engine Volume (in l.) */
    engineVolumeTo?: number

    /** Year */
    's_yers[0]'?: number,
    'po_yers[0]'?: number,

    /** Region */
    'state[0]'?: number,
    'city[0]'?: number,

    /** Brand */
    'marka_id[0]'?: number,
    /** Model: 0 -- all */
    'model_id[0]'?: number,
}
