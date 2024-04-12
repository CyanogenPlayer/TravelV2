import {ERole} from "../enums";

export interface IUser {
    id: string,
    username: string,
    email: string,
    password: string,
    roles: ERole[],
    re_password?: string
}