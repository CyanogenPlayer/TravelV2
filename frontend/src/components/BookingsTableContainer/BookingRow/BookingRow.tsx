import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IBooking} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";
import {BookingForm} from "../../BookingForm";
import {DeleteModal} from "../../DeleteModal";
import {BookingDetailsModal} from "../../BookingDetailsModal";

interface IProp {
    booking: IBooking,
    manager?: boolean
}

const BookingRow: FC<IProp> = ({booking, manager}) => {
    const {hotels: {hotelsForManagement}, rooms: {roomsForManagement}, users: {users}} = useAppSelector(state => state);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState<boolean>(null)
    const [hotelName, setHotelName] = useState<string>(null)
    const [username, setUsername] = useState<string>(null)
    const [price, setPrice] = useState<number>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowBookingDetailsModal = () => setShowBookingDetailsModal(true)

    const update = (updatedBooking: IBooking) => {
        updatedBooking.roomId = booking.roomId
        updatedBooking.userId = booking.userId
        dispatch(bookingActions.update({bookingId: booking.id, booking: updatedBooking}))
    }

    const deleteBooking = () => {
        dispatch(bookingActions.deleteBooking({bookingId: booking.id}))
    }

    useEffect(() => {
        if (hotelsForManagement.length > 0) {
            const room = roomsForManagement.find(({id}) => id === booking.roomId)
            if (room) {
                setPrice(room.price)
                const hotel = hotelsForManagement.find(({id}) => id === room?.hotelId)
                if (hotel) {
                    setHotelName(hotel.name)
                }
            }
        }
    }, [roomsForManagement, booking.roomId, hotelsForManagement]);

    useEffect(() => {
        if (users.length > 0) {
            const user = users.find(({id}) => id === booking.userId)
            if (user) {
                setUsername(user.username)
            }
        }
    }, [users, booking.userId]);

    return (
        <>
            <tr>
                <th>{booking.id}</th>
                <th>{booking.bookedSince.toString()}</th>
                <th>{booking.bookedTo.toString()}</th>
                <th>{booking.price}&#8372;</th>
                {manager &&
                    <>
                        <th>{hotelName}</th>
                        <th>{username}</th>
                    </>
                }
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingDetailsModal}>View
                        Details</Button>
                    {manager &&
                        <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>}
                    <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <BookingForm show={showUpdateForm} setShow={setShowUpdateForm} price={price} booking={booking}
                         submit={update}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName="booking"
                         deleteAction={deleteBooking}/>
            <BookingDetailsModal show={showBookingDetailsModal} setShow={setShowBookingDetailsModal} booking={booking}/>
        </>
    );
};

export {
    BookingRow
}