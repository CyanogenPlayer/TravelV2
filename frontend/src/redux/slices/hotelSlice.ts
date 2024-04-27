import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IHotel, IMessage} from "../../interfaces";
import {hotelService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    hotel: IHotel,
    hotels: IHotel[],
    hotelsForManagement: IHotel[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    hotel: null,
    hotels: [],
    hotelsForManagement: [],
    trigger: null,
    isLoading: false
}

const getAll = createAsyncThunk<IHotel[], void, { rejectValue: IMessage }>(
    'hotelSlice/getAll',
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
    'hotelSlice/getByCountryId',
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

const create = createAsyncThunk<void, { hotel: IHotel }, { rejectValue: IMessage }>(
    'hotelSlice/create',
    async ({hotel}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.create(hotel)
            dispatch(alertActions.setMessage('Hotel successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { hotelId: string, hotel: IHotel },
    { rejectValue: IMessage }>(
    'hotelSlice/update',
    async ({hotelId, hotel}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.update(hotelId, hotel)
            dispatch(alertActions.setMessage('Hotel successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.hotelsForManagement = action.payload
            })

            .addCase(getById.fulfilled, (state, action) => {
                state.hotel = action.payload
            })

            .addMatcher(isFulfilled(getAll, getByCountryId), (state, action) => {
                state.hotels = action.payload;
            })

            .addMatcher(isFulfilled(getAll, getByCountryId, getById), state => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getByCountryId, getById), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getByCountryId, getById), state => {
                state.isLoading = true
            })
    }
})

const {reducer: hotelReducer, actions} = hotelSlice;

const hotelActions = {
    ...actions,
    getAll,
    getByCountryId,
    getById,
    create,
    update
}

export {
    hotelActions,
    hotelReducer
}