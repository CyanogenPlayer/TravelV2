import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IRoom} from "../../interfaces";
import {roomService} from "../../services";

interface IState {
    rooms: IRoom[]
}

const initialState: IState = {
    rooms: []
}

const getAll = createAsyncThunk<IRoom[], void>(
    'roomSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const getByHotelId = createAsyncThunk<IRoom[], { hotelId: string }>(
    'roomSlice/getByHotelId',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getByHotelId(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isFulfilled(getAll, getByHotelId), (state, action) => {
                state.rooms = action.payload;
            })
    }
})

const {reducer: roomReducer, actions} = roomSlice;

const roomActions = {
    ...actions,
    getAll,
    getByHotelId
}

export {
    roomActions,
    roomReducer
}