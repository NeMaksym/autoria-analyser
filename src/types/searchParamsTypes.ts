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

    /** Fuel: 1 - bensin */
    'type[0]'?: 1,

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
    'state[2]'?: number,

    /** Brand */
    'marka_id[0]'?: number,
    /** Model: 0 -- all */
    'model_id[0]'?: number,
}
