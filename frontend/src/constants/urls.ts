const baseURL = '/api/v2'

const countries = '/countries'
const hotels = '/hotels'

const urls = {
    countries: {
        allCountries: `${countries}`,
        byId: (countryId: string): string => `${countries}/${countryId}`
    },
    hotels: {
        allHotels: `${hotels}`,
        byId: (hotelId: string): string => `${hotels}/${hotelId}`
    }
}

export {
    baseURL,
    urls
}