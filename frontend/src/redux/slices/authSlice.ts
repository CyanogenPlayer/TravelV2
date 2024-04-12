import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IUser} from "../../interfaces";
import {authService} from "../../services";
import {ERole} from "../../enums";

interface IState {
    isAuth: boolean,
    isLogin: boolean,
    user: IUser,
    authError: string,
    message: string
}

const initialState: IState = {
    isAuth: false,
    isLogin: true,
    user: null,
    authError: null,
    message: null
}

interface JwtResponse {
    token: string,
    type: string,
    id: string,
    username: string,
    email: string,
    roles: ERole[]
}

const signIn = createAsyncThunk<JwtResponse, { user: IUser }, { rejectValue: IMessage }>(
    'authSlice/signIn',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.signIn(user)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const signUp = createAsyncThunk<IMessage, { user: IUser }, { rejectValue: IMessage }>(
    'authSlice/signUp',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.signUp(user)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
        setAuthError: (state, action) => {
            state.authError = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                authService.setToken(action.payload.token)
                state.isAuth = true
            })

            .addCase(signUp.fulfilled, (state, action) => {
                state.message = action.payload.message
            })

            .addMatcher(isFulfilled(signIn, signUp), (state) => {
                state.authError = null
            })

            .addMatcher(isRejected(signIn, signUp), (state, action) => {
                state.authError = action.payload.message
            })
    }
})

const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    signIn,
    signUp
}

export {
    authActions,
    authReducer
}