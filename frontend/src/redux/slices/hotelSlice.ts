import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IHotel} from "../../interfaces";
import {hotelService} from "../../services";

interface IState {
    hotels: IHotel[]
}

const initialState: IState = {
    hotels: []
}

const getAll = createAsyncThunk<IHotel[], void>(
    'hotelSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getAll()
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
            .addCase(getAll.fulfilled, (state, action) => {
                state.hotels = action.payload;
            })
    }
})

const {reducer: hotelReducer, actions} = hotelSlice;

const hotelActions = {
    ...actions,
    getAll
}

export {
    hotelActions,
    hotelReducer
}