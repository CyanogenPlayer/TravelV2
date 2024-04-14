const baseURL = '/api/v2'

const auth = '/auth'
const bookings = '/bookings'
const countries = '/countries'
const hotels = '/hotels'
const rooms = '/rooms'

const urls = {
    auth: {
        signIn: `${auth}/signIn`,
        signUp: `${auth}/signUp`,
        me: `${auth}/me`
    },
    bookings: {
        create: `${bookings}`,
        bookingsByUserId: (userId: string) => `${bookings}/list/${userId}`
    },
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