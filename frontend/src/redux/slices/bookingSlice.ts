import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBooking, IMessage} from "../../interfaces";
import {bookingService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    bookings: IBooking[],
    bookingsForManagement: IBooking[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    bookings: [],
    bookingsForManagement: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<IBooking[], void, { rejectValue: IMessage }>(
    'bookingSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await bookingService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const getByUserId = createAsyncThunk<IBooking[], { userId: string },
    { rejectValue: IMessage }>(
    'bookingSlice/getByUserId',
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
            return rejectWithValue(data)
        }
    }
)

const update = createAsyncThunk<void, { bookingId: string, booking: IBooking },
    { rejectValue: IMessage }>(
    'bookingSlice/update',
    async ({bookingId, booking}, {rejectWithValue, dispatch}) => {
        try {
            await bookingService.update(bookingId, booking)
            dispatch(alertActions.setMessage('Booking successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const bookingSlice = createSlice({
    name: 'bookingSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.bookingsForManagement = action.payload
            })

            .addCase(getByUserId.fulfilled, (state, action) => {
                state.bookings = action.payload
            })

            .addMatcher(isFulfilled(getAll, getByUserId), state => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getByUserId), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getByUserId), state => {
                state.isLoading = true
            })
    }
})

const {reducer: bookingReducer, actions} = bookingSlice

const bookingActions = {
    ...actions,
    getAll,
    getByUserId,
    create,
    update
}

export {
    bookingActions,
    bookingReducer
}