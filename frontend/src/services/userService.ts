import {IRes} from "../types";
import {IUser} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const userService = {
    getAll: (): IRes<IUser[]> => axiosService.get(urls.users.allUsers)
}

export {
    userService
}