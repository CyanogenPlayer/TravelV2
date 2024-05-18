import {Table} from "react-bootstrap";
import {FC} from "react";

import {BookingRow} from "../BookingRow";
import {IBooking} from "../../../interfaces";

interface IProp {
    bookings: IBooking[],
    manager?: boolean
}

const BookingsTable: FC<IProp> = ({bookings, manager}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Booked since date</th>
                <th>Booked to date</th>
                <th>Hotel</th>
                {manager && <th>User</th>}
                <th>Price</th>
                <th>State</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {bookings && bookings.map(booking => <BookingRow key={booking.id} booking={booking} manager={manager}/>)}
            </tbody>
        </Table>
    );
};

export {
    BookingsTable
}