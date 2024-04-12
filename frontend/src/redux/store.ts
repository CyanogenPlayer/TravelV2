import {configureStore} from "@reduxjs/toolkit";

import {authReducer, countryReducer, hotelReducer, roomReducer} from "./slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        countries: countryReducer,
        hotels: hotelReducer,
        rooms: roomReducer,
    }
})

export {
    store
}