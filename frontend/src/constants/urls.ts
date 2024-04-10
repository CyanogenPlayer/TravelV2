const baseURL = '/api/v2'

const countries = '/countries'
const hotels = '/hotels'

const urls = {
    countries: {
        allCountries: `${countries}`,
    },
    hotels: {
        allHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string): string => `${countries}/${countryId}${hotels}`
    }
}

export {
    baseURL,
    urls
}