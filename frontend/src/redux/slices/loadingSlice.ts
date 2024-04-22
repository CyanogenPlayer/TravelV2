import {createSlice, UnknownAction} from "@reduxjs/toolkit";

interface IState {
    loading: boolean
}

const initialState: IState = {
    loading: null
}

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                (action: UnknownAction) =>
                    action.type.includes("/pending") && action.type.includes(":load"),
                (state) => {
                    state.loading = true;
                },
            )

            .addMatcher(
                (action: UnknownAction) =>
                    action.type.includes("/fulfilled") && action.type.includes(":load"),
                (state) => {
                    state.loading = false;
                },
            )
            .addMatcher(
                (action: UnknownAction) =>
                    action.type.includes("/rejected") && action.type.includes(":load"),
                (state) => {
                    state.loading = false;
                },
            )
    }
})

const {reducer: loadingReducer} = loadingSlice

export {
    loadingReducer
}
