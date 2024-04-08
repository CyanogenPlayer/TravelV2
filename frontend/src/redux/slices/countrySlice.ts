import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICountry} from "../../interfaces";
import {countryService} from "../../services";

interface IState {
    countries: ICountry[]
}

const initialState: IState = {
    countries: []
}

const getAll = createAsyncThunk<ICountry[], void>(
    'countrySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await countryService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data);
        }
    }
)

const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.countries = action.payload;
            })
    }
});

const {reducer: countryReducer, actions} = countrySlice;

const countryActions = {
    ...actions,
    getAll
}

export {
    countryActions,
    countryReducer
}