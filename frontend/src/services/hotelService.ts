import {IRes} from "../types";
import {IHotel} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const hotelService = {
    getAll: (): IRes<IHotel[]> => axiosService.get(urls.hotels.allHotels)
}

export {
    hotelService
}