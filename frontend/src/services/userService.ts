import {IRes} from "../types";
import {IUser} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const userService = {
    getAll: (): IRes<IUser[]> => axiosService.get(urls.users.allUsers),
    updateRoles: (userId: string, user: IUser) => axiosService.patch(urls.users.updateRoles(userId), user)
}

export {
    userService
}