import {FC} from "react";

import {IBooking} from "../../../interfaces";

interface IProp {
    booking: IBooking,
}

const Booking: FC<IProp> = ({booking}) => {
    return (
        <tr>
            <th>{booking.id}</th>
            <th>{booking.bookedSince.toString()}</th>
            <th>{booking.bookedTo.toString()}</th>
            <th>{booking.roomId}</th>
        </tr>
    );
};

export {
    Booking
}