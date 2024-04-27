import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IRoom} from "../../interfaces";
import {roomService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    rooms: IRoom[],
    roomsForManagement: IRoom[],
    trigger: boolean
}

const initialState: IState = {
    rooms: [],
    roomsForManagement: [],
    trigger: null
}

const getAll = createAsyncThunk<IRoom[], void, { rejectValue: IMessage }>(
    'roomSlice/getAll:load',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByHotelId = createAsyncThunk<IRoom[], { hotelId: string },
    { rejectValue: IMessage }>(
    'roomSlice/getByHotelId:load',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getByHotelId(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getAllAvailableForPeriod = createAsyncThunk<IRoom[], {
    hotelId: string,
    bookedSince: Date,
    bookedTo: Date
}, { rejectValue: IMessage }>(
    'roomSlice/getAllAvailableForPeriod:load',
    async ({hotelId, bookedSince, bookedTo}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAllAvailableForPeriod(
                hotelId,
                bookedSince.toISOString(),
                bookedTo.toISOString())
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const create = createAsyncThunk<void, { room: IRoom }, { rejectValue: IMessage }>(
    'roomSlice/create',
    async ({room}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.create(room)
            dispatch(alertActions.setMessage('Room successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { roomId: string, room: IRoom },
    { rejectValue: IMessage }>(
    'roomSlice/update',
    async ({roomId, room}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.update(roomId, room)
            dispatch(alertActions.setMessage('Room successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.roomsForManagement = action.payload
            })

            .addMatcher(isFulfilled(getAll, getByHotelId, getAllAvailableForPeriod), (state, action) => {
                state.rooms = action.payload;
            })

            .addMatcher(isFulfilled(create, update), (state) => {
                state.trigger = !state.trigger
            })
    }
})

const {reducer: roomReducer, actions} = roomSlice;

const roomActions = {
    ...actions,
    getAll,
    getByHotelId,
    getAllAvailableForPeriod,
    create,
    update
}

export {
    roomActions,
    roomReducer
}