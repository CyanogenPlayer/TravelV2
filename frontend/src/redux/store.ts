import {configureStore} from "@reduxjs/toolkit";

import {
    alertReducer,
    authReducer,
    bookingReducer,
    countryReducer,
    hotelReducer,
    loadingReducer,
    roomReducer
} from "./slices";

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        auth: authReducer,
        bookings: bookingReducer,
        countries: countryReducer,
        hotels: hotelReducer,
        loading: loadingReducer,
        rooms: roomReducer,
    }
})

export {
    store
}