import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";
import {BookingRow} from "../BookingRow";

const BookingsTable = () => {
    const {user} = useAppSelector(state => state.auth);
    const {bookings} = useAppSelector(state => state.bookings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            dispatch(bookingActions.getByUserId({userId: user.id}))
        }
    }, [dispatch, user]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>bookedSince</th>
                    <th>bookedTo</th>
                    <th>roomId</th>
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