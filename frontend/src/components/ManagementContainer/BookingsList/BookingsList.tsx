import {useEffect} from "react";

import {BookingsTable} from "../../BookingsTableContainer";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";

const BookingsList = () => {
    const {bookingsForManagement, trigger} = useAppSelector(state => state.bookings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(bookingActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div>
            <h2>Bookings:</h2>
            <BookingsTable bookings={bookingsForManagement}/>
        </div>
    );
};

export {
    BookingsList
}