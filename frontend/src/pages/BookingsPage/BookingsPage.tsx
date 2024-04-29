import {useEffect} from "react";

import {BookingsTable} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {bookingActions} from "../../redux";

const BookingsPage = () => {
    const {auth: {user}, bookings: {bookings, trigger}} =
        useAppSelector(state => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            dispatch(bookingActions.getByUserId({userId: user.id}))
        }
    }, [dispatch, user, trigger]);

    return (
        <div>
            <BookingsTable bookings={bookings}/>
        </div>
    );
};

export {
    BookingsPage
}