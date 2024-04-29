import {IBooking} from "../interfaces";
import {IRes} from "../types";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const bookingService = {
    getAll: (): IRes<IBooking[]> => axiosService.get(urls.bookings.allBookings),
    getByUserId: (userId: string): IRes<IBooking[]> => axiosService.get(urls.bookings.bookingsByUserId(userId)),
    create: (booking: IBooking): IRes<IBooking> => axiosService.post(urls.bookings.create, booking),
    update: (bookingId: string, booking: IBooking): IRes<IBooking> =>
        axiosService.patch(urls.bookings.update(bookingId), booking)
}

export {
    bookingService
}