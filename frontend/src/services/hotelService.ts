import {IRes} from "../types";
import {IHotel} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const hotelService = {
    getAll: (): IRes<IHotel[]> => axiosService.get(urls.hotels.allHotels),
    getByCountryId: (countryId: string): IRes<IHotel[]> => axiosService.get(urls.hotels.hotelsByCountryId(countryId)),
    getById: (hotelId: string): IRes<IHotel> => axiosService.get(urls.hotels.byId(hotelId)),
    create: (hotel: IHotel): IRes<IHotel> => axiosService.post(urls.hotels.create, hotel),
    update: (hotelId: string, hotel: IHotel): IRes<IHotel> => axiosService.patch(urls.hotels.update(hotelId), hotel),
    deleteHotel: (hotelId: string): IRes<void> => axiosService.delete(urls.hotels.deleteHotel(hotelId))
}

export {
    hotelService
}