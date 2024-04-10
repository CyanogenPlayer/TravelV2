import {IRes} from "../types";
import {IRoom} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const roomService = {
    getAll: (): IRes<IRoom[]> => axiosService.get(urls.rooms.allRooms),
    getByHotelId: (hotelId: string): IRes<IRoom[]> => axiosService.get(urls.rooms.roomsByHotelId(hotelId))
}

export {
    roomService
}