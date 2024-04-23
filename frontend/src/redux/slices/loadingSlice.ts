import {createSlice, UnknownAction} from "@reduxjs/toolkit";

interface IState {
    isLoading: boolean
}

const initialState: IState = {
    isLoading: false
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
                    state.isLoading = true;
                },
            )

            .addMatcher(
                (action: UnknownAction) =>
                    action.type.includes("/fulfilled") && action.type.includes(":load"),
                (state) => {
                    state.isLoading = false;
                },
            )
            .addMatcher(
                (action: UnknownAction) =>
                    action.type.includes("/rejected") && action.type.includes(":load"),
                (state) => {
                    state.isLoading = false;
                },
            )
    }
})

const {reducer: loadingReducer} = loadingSlice

export {
    loadingReducer
}
