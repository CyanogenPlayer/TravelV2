const baseURL = '/api/v2'

const auth = '/auth'
const bookings = '/bookings'
const countries = '/countries'
const hotels = '/hotels'
const photos = '/photos'
const rooms = '/rooms'
const search = '/search'
const users = '/users'

const urls = {
    auth: {
        signIn: `${auth}/signIn`,
        signUp: `${auth}/signUp`,
        me: `${auth}/me`
    },
    bookings: {
        allBookings: `${bookings}`,
        bookingsForRoom: (roomId: string) => `${rooms}/${roomId}${bookings}`,
        bookingsByUserId: (userId: string) => `${bookings}/list/${userId}`,
        create: `${bookings}`,
        update: (bookingId: string) => `${bookings}/${bookingId}`,
        deleteBooking: (bookingId: string) => `${bookings}/${bookingId}`,
        updateState: (bookingId: string) => `${bookings}/${bookingId}/state`,
        cancelBooking: (bookingId: string) => `${bookings}/${bookingId}/cancel`,
    },
    countries: {
        allCountries: `${countries}`,
        byId: (countryId: string) => `${countries}/${countryId}`,
        create: `${countries}`,
        update: (countryId: string) => `${countries}/${countryId}`,
        deleteCountry: (countryId: string) => `${countries}/${countryId}`
    },
    hotels: {
        allHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string): string => `${countries}/${countryId}${hotels}`,
        byId: (hotelId: string): string => `${hotels}/${hotelId}`,
        create: `${hotels}`,
        update: (hotelId: string) => `${hotels}/${hotelId}`,
        deleteHotel: (hotelId: string) => `${hotels}/${hotelId}`,
        addPhotos: (hotelId: string) => `${hotels}/${hotelId}${photos}`,
        deletePhoto: (hotelId: string) => `${hotels}/${hotelId}${photos}`,
    },
    photos: {
        byId: (photoId: string): string => `${photos}/${photoId}`
    },
    rooms: {
        allRooms: `${rooms}`,
        roomsByHotelId: (hotelId: string): string => `${hotels}/${hotelId}${rooms}`,
        byId: (roomId: string): string => `${rooms}/${roomId}`,
        allAvailableForPeriod: (hotelId: string): string => `${hotels}/${hotelId}${rooms}`,
        create: `${rooms}`,
        update: (roomId: string) => `${rooms}/${roomId}`,
        deleteRoom: (roomId: string) => `${rooms}/${roomId}`
    },
    search: {
        bookingsByUserAndHotel: `${search}${bookings}`,
        hotelsWithAvailableRooms: `${search}${hotels}`
    },
    users: {
        allUsers: `${users}`,
        byId: (userId: string) => `${users}/${userId}`,
        updateRoles: (userId: string) => `${users}/${userId}`
    }
}

export {
    baseURL,
    urls
}