import {IUser} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const authService = {
    signIn: (user: IUser): IRes<any> => axiosService.post(urls.auth.signIn, user),
    signUp: (user: IUser): IRes<any> => axiosService.post(urls.auth.signUp, user),

    setToken: (token: string) => localStorage.setItem('token', token),
    getToken: () => localStorage.getItem('token'),
    deleteToken: () => localStorage.removeItem('token')
}

export {
    authService
}