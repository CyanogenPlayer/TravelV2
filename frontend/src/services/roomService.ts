import {IRes} from "../types";
import {IRoom} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const roomService = {
    getAll: (): IRes<IRoom[]> => axiosService.get(urls.rooms.allRooms),
    getByHotelId: (hotelId: string): IRes<IRoom[]> => axiosService.get(urls.rooms.roomsByHotelId(hotelId)),
    getAllAvailableForPeriod: (hotelId: string, bookedSince: string, bookedTo: string): IRes<IRoom[]> =>
        axiosService.get(urls.rooms.allAvailableForPeriod(hotelId, bookedSince, bookedTo)),
    create: (room: IRoom): IRes<IRoom> => axiosService.post(urls.rooms.create, room),
    update: (roomId: string, room: IRoom): IRes<IRoom> => axiosService.patch(urls.rooms.update(roomId), room)
}

export {
    roomService
}