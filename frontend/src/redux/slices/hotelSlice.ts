import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IHotel, IMessage} from "../../interfaces";
import {hotelService} from "../../services";

interface IState {
    hotel: IHotel,
    hotels: IHotel[]
}

const initialState: IState = {
    hotel: null,
    hotels: []
}

const getAll = createAsyncThunk<IHotel[], void, { rejectValue: IMessage }>(
    'hotelSlice/getAll:load',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByCountryId = createAsyncThunk<IHotel[], { countryId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/getByCountryId:load',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getByCountryId(countryId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getById = createAsyncThunk<IHotel, { hotelId: string }>(
    'hotelSlice/getById',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getById(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isFulfilled(getAll, getByCountryId), (state, action) => {
                state.hotels = action.payload;
            })

            .addMatcher(isFulfilled(getById), (state, action) => {
                state.hotel = action.payload
            })
    }
})

const {reducer: hotelReducer, actions} = hotelSlice;

const hotelActions = {
    ...actions,
    getAll,
    getByCountryId,
    getById
}

export {
    hotelActions,
    hotelReducer
}