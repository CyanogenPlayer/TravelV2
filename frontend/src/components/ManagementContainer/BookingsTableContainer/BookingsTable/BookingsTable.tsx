import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {bookingActions} from "../../../../redux";
import {BookingRow} from "../BookingRow";

const BookingsTable = () => {
    const {bookings} = useAppSelector(state => state.bookings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookingActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Bookings:</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>bookedSince</th>
                    <th>bookedTo</th>
                    <th>roomId</th>
                    <th>userId</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings && bookings.map(booking => <BookingRow key={booking.id} booking={booking}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export {
    BookingsTable
}