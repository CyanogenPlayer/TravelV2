import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IBooking, IMessage} from "../../interfaces";
import {bookingService} from "../../services";
import {alertActions} from "./alertSlice";
import {AxiosError} from "axios";

interface IState {
    bookings: IBooking[]
}

const initialState: IState = {
    bookings: []
}

const create = createAsyncThunk<void, { booking: IBooking }, { rejectValue: IMessage }>(
    'bookingSlice/create',
    async ({booking}, {rejectWithValue, dispatch}) => {
        try {
            await bookingService.create(booking)
            dispatch(alertActions.setMessage('Booking successfully created!'))
        } catch (e) {
            const err = e as AxiosError
            const data = err.response.data as IMessage
            dispatch(alertActions.setError(data.message))
            return (rejectWithValue(data))
        }
    }
)

const getByUserId = createAsyncThunk<IBooking[], { userId: string },
    { rejectValue: IMessage }>(
    'bookingSlice/getByUserId:load',
    async ({userId}, {rejectWithValue}) => {
        try {
            const {data} = await bookingService.getByUserId(userId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getByUserId.fulfilled, (state, action) => {
                state.bookings = action.payload
            })
    }
})

const {reducer: bookingReducer, actions} = bookingSlice

const bookingActions = {
    ...actions,
    create,
    getByUserId
}

export {
    bookingActions,
    bookingReducer
}