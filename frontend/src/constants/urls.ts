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
        bookingsByUserId: (userId: string) => `${bookings}/list/${userId}`,
        create: `${bookings}`,
        update: (bookingId: string) => `${bookings}/${bookingId}`
    },
    countries: {
        allCountries: `${countries}`,
        create: `${countries}`,
        update: (countryId: string) => `${countries}/${countryId}`
    },
    hotels: {
        allHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string): string => `${countries}/${countryId}${hotels}`,
        byId: (hotelId: string): string => `${hotels}/${hotelId}`,
        create: `${hotels}`,
        update: (hotelId: string) => `${hotels}/${hotelId}`
    },
    rooms: {
        allRooms: `${rooms}`,
        roomsByHotelId: (hotelId: string): string => `${hotels}/${hotelId}${rooms}`,
        allAvailableForPeriod: (hotelId: string, bookedSince: string, bookedTo: string): string =>
            `${hotels}/${hotelId}${rooms}?bookedSince=${bookedSince}&bookedTo=${bookedTo}`,
        create: `${rooms}`,
        update: (roomId: string) => `${rooms}/${roomId}`
    },
    users: {
        allUsers: `${users}`,
        updateRoles: (userId: string) => `${users}/${userId}`
    }
}

export {
    baseURL,
    urls
}