import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICountry, IMessage} from "../../interfaces";
import {countryService} from "../../services";

interface IState {
    country: ICountry,
    countries: ICountry[]
}

const initialState: IState = {
    country: null,
    countries: []
}

const getAll = createAsyncThunk<ICountry[], void, { rejectValue: IMessage }>(
    'countrySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await countryService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getById = createAsyncThunk<ICountry, { countryId: string }, { rejectValue: IMessage }>(
    'countrySlice/getById',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await countryService.getById(countryId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
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

            .addCase(getById.fulfilled, (state, action) => {
                state.country = action.payload
            })
    }
});

const {reducer: countryReducer, actions} = countrySlice;

const countryActions = {
    ...actions,
    getAll,
    getById
}

export {
    countryActions,
    countryReducer
}