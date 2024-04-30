import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IRoom} from "../../interfaces";
import {roomService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    rooms: IRoom[],
    roomsForManagement: IRoom[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    rooms: [],
    roomsForManagement: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<IRoom[], void, { rejectValue: IMessage }>(
    'roomSlice/getAll',
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
    'roomSlice/getByHotelId',
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
    'roomSlice/getAllAvailableForPeriod',
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

const deleteRoom = createAsyncThunk<void, { roomId: string },
    { rejectValue: IMessage }>(
    'roomSlice/deleteRoom',
    async ({roomId}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.deleteRoom(roomId)
            dispatch(alertActions.setMessage('Room successfully deleted!'))
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
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update, deleteRoom), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getByHotelId, getAllAvailableForPeriod), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getByHotelId, getAllAvailableForPeriod), state => {
                state.isLoading = true
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
    update,
    deleteRoom
}

export {
    roomActions,
    roomReducer
}