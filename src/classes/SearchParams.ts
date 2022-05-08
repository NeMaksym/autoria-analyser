import { omit } from 'lodash'
import { Gearbox } from 'types/searchParamsTypes';
import { Params, CustomParams } from 'types/searchParamsTypes';

class SearchParams {
    params: Params = {
        indexName: 'auto',
        category_id: 1,
        with_photo: 1,
        saledParam: 2,
        originExclude: 1,
        'brandOrigin[0]': 643,
        'brandOrigin[1]': 804,
    }

    get values() {
        return this.params
    }

    constructor(customParams?: CustomParams) {
        if (typeof customParams === 'undefined') return

        this.params = {
            ...this.params,
            ...customParams
        }
    }

    setGearbox(gearbox: Gearbox) {
        switch (gearbox) {
            case Gearbox.mechanic:
                this.params = {
                    ...this.params,
                    'gearbox[0]': 1
                };
                break;
            case Gearbox.auto:
                this.params = {
                    ...this.params,
                    'gearbox[0]': 2,
                    'gearbox[1]': 3,
                    'gearbox[2]': 4,
                    'gearbox[3]': 5,
                };
                break;
            case Gearbox.none:
                this.params = {
                    ...omit(this.params, [
                        'gearbox[0]',
                        'gearbox[1]',
                        'gearbox[2]',
                        'gearbox[3]'
                    ])
                }
                break;
            default: console.error("Wrong type of gearbox is provided")
        }

        return this
    }

    setYear(from: Params["s_yers[0]"], to: Params["po_yers[0]"]) {
        this.params = {
            ...this.params,
            's_yers[0]': from,
            'po_yers[0]': to,
        }

        return this
    }

    removeYear() {
        this.params = {
            ...omit(this.params, ['s_yers[0]', 'po_yers[0]'])
        }

        return this
    }

    setRegion(regionId?: string) {
        if (typeof regionId === 'string') {
            this.params = {
                ...this.params,
                'state[2]': Number(regionId),
            }
        } else {
            this.params = {
                ...omit(this.params, ['state[2]'])
            }
        }

        return this
    }

    setBrand(brandId?: number, modelId?: number) {
        if (typeof brandId === 'number') {
            this.params = {
                ...this.params,
                'marka_id[0]': brandId,
                'model_id[0]': modelId || 0,
            }
        } else {
            this.params = {
                ...omit(this.params, ['marka_id[0]', 'model_id[0]'])
            }
        }

        return this
    }
}

export default SearchParams;
