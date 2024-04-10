const baseURL = '/api/v2'

const countries = '/countries'
const hotels = '/hotels'
const rooms = '/rooms'

const urls = {
    countries: {
        allCountries: `${countries}`,
        byId: (countryId: string): string => `${countries}/${countryId}`
    },
    hotels: {
        allHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string): string => `${countries}/${countryId}${hotels}`,
        byId: (hotelId: string): string => `${hotels}/${hotelId}`
    },
    rooms: {
        allRooms: `${rooms}`,
        roomsByHotelId: (hotelId: string): string => `${hotels}/${hotelId}${rooms}`
    }
}

export {
    baseURL,
    urls
}