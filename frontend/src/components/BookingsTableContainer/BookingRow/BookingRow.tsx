import {Button} from "react-bootstrap";
import {FC, useState} from "react";

import {IBooking} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {bookingActions} from "../../../redux";
import {BookingForm} from "../../BookingForm";
import {DeleteModal} from "../../DeleteModal";

interface IProp {
    booking: IBooking
}

const BookingRow: FC<IProp> = ({booking}) => {
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)

    const update = (updatedBooking: IBooking) => {
        updatedBooking.roomId = booking.roomId
        updatedBooking.userId = booking.userId
        dispatch(bookingActions.update({bookingId: booking.id, booking: updatedBooking}))
    }

    const deleteBooking = () => {
        dispatch(bookingActions.deleteBooking({bookingId: booking.id}))
    }

    return (
        <>
            <tr>
                <th>{booking.id}</th>
                <th>{booking.bookedSince.toString()}</th>
                <th>{booking.bookedTo.toString()}</th>
                <th>{booking.roomId}</th>
                <th>{booking.userId}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="primary" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <BookingForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} booking={booking}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName="booking"
                         deleteAction={deleteBooking}/>
        </>
    );
};

export {
    BookingRow
}