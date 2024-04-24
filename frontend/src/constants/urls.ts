const baseURL = '/api/v2'

const auth = '/auth'
const bookings = '/bookings'
const countries = '/countries'
const hotels = '/hotels'
const rooms = '/rooms'
const users = '/users'

const urls = {
    auth: {
        signIn: `${auth}/signIn`,
        signUp: `${auth}/signUp`,
        me: `${auth}/me`
    },
    bookings: {
        allBookings: `${bookings}`,
        create: `${bookings}`,
        bookingsByUserId: (userId: string) => `${bookings}/list/${userId}`
    },
    countries: {
        allCountries: `${countries}`
    },
    hotels: {
        allHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string): string => `${countries}/${countryId}${hotels}`,
        byId: (hotelId: string): string => `${hotels}/${hotelId}`
    },
    rooms: {
        allRooms: `${rooms}`,
        roomsByHotelId: (hotelId: string): string => `${hotels}/${hotelId}${rooms}`,
        allAvailableForPeriod: (hotelId: string, bookedSince: string, bookedTo: string): string =>
            `${hotels}/${hotelId}${rooms}?bookedSince=${bookedSince}&bookedTo=${bookedTo}`
    },
    users: {
        allUsers: `${users}`
    }
}

export {
    baseURL,
    urls
}