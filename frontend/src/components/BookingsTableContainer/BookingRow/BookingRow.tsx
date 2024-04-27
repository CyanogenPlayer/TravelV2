import {FC} from "react";

import {IBooking} from "../../../interfaces";
import {Button} from "react-bootstrap";

interface IProp {
    booking: IBooking
}

const BookingRow: FC<IProp> = ({booking}) => {
    return (
        <tr>
            <th>{booking.id}</th>
            <th>{booking.bookedSince.toString()}</th>
            <th>{booking.bookedTo.toString()}</th>
            <th>{booking.roomId}</th>
            <th>{booking.userId}</th>
            <th>
                <Button variant="primary" disabled={true}>Update</Button>
                <Button variant="primary" className="ms-1" disabled={true}>Delete</Button>
            </th>
        </tr>
    );
};

export {
    BookingRow
}