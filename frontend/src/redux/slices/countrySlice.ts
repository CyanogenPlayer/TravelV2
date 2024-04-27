import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICountry, IMessage} from "../../interfaces";
import {countryService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    countries: ICountry[],
    countriesForManagement: ICountry[],
    trigger: boolean
}

const initialState: IState = {
    countries: [],
    countriesForManagement: [],
    trigger: null
}

const getAll = createAsyncThunk<ICountry[], void, { rejectValue: IMessage }>(
    'countrySlice/getAll:load',
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

const create = createAsyncThunk<void, { country: ICountry }, { rejectValue: IMessage }>(
    'countrySlice/create',
    async ({country}, {rejectWithValue, dispatch}) => {
        try {
            await countryService.create(country)
            dispatch(alertActions.setMessage('Country successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { countryId: string, country: ICountry },
    { rejectValue: IMessage }>(
    'countrySlice/update',
    async ({countryId, country}, {rejectWithValue, dispatch}) => {
        try{
            await countryService.update(countryId, country)
            dispatch(alertActions.setMessage('Country successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const countrySlice = createSlice({
    name: 'countrySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.countriesForManagement = action.payload
            })

            .addMatcher(isFulfilled(create, update), (state) => {
                state.trigger = !state.trigger
            })
    }
});

const {reducer: countryReducer, actions} = countrySlice;

const countryActions = {
    ...actions,
    getAll,
    create,
    update
}

export {
    countryActions,
    countryReducer
}