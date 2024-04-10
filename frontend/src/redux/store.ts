import {configureStore} from "@reduxjs/toolkit";

import {countryReducer, hotelReducer, roomReducer} from "./slices";

const store = configureStore({
    reducer: {
        countries: countryReducer,
        hotels: hotelReducer,
        rooms: roomReducer
    }
})

export {
    store
}