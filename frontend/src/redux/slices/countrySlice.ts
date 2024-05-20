import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICountry, IMessage} from "../../interfaces";
import {countryService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    country: ICountry,
    countries: ICountry[],
    countriesForManagement: ICountry[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    country: null,
    countries: [],
    countriesForManagement: [],
    trigger: null,
    isLoading: null
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

const getById = createAsyncThunk<ICountry, { countryId: string },
    { rejectValue: IMessage }>(
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
        try {
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

const deleteCountry = createAsyncThunk<void, { countryId: string },
    { rejectValue: IMessage }>(
    'countrySlice/deleteCountry',
    async ({countryId}, {rejectWithValue, dispatch}) => {
        try {
            await countryService.deleteCountry(countryId)
            dispatch(alertActions.setMessage('Country successfully deleted!'))
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

            .addCase(getById.fulfilled, (state, action) => {
                state.country = action.payload;
            })

            .addMatcher(isFulfilled(getAll, getById), (state, action) => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update, deleteCountry), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getById), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getById), state => {
                state.isLoading = true
            })
    }
});

const {reducer: countryReducer, actions} = countrySlice;

const countryActions = {
    ...actions,
    getAll,
    getById,
    create,
    update,
    deleteCountry
}

export {
    countryActions,
    countryReducer
}