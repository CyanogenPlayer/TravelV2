import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IRoom} from "../../interfaces";
import {roomService} from "../../services";

interface IState {
    rooms: IRoom[]
}

const initialState: IState = {
    rooms: []
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