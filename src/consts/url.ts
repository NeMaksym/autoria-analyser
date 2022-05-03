const BASE_URL = 'https://autoria-analyser-2mrll.ondigitalocean.app'

const URL = {
    search: `${BASE_URL}/demo/bu/searchPage/search/indexes/auto?`,
    brands: `${BASE_URL}/demo/api/categories/1/brands/_active/_with_count/_with_country?langId=2`,
    models: `${BASE_URL}/api/categories/1/marks/{brandId}/models/_active/_with_count?langId=2`,
}

export default URL;
