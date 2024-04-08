import {configureStore} from "@reduxjs/toolkit";

import {countryReducer, hotelReducer} from "./slices";

const store = configureStore({
    reducer: {
        countries: countryReducer,
        hotels: hotelReducer
    }
})

export {
    store
}