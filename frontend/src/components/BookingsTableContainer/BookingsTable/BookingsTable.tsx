import {Table} from "react-bootstrap";
import {FC} from "react";

import {BookingRow} from "../BookingRow";
import {IBooking} from "../../../interfaces";

interface IProp {
    bookings: IBooking[]
}

const BookingsTable: FC<IProp> = ({bookings}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Booked since date</th>
                <th>Booked to date</th>
                <th>Room ID</th>
                <th>User ID</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {bookings && bookings.map(booking => <BookingRow key={booking.id} booking={booking}/>)}
            </tbody>
        </Table>
    );
};

export {
    BookingsTable
}