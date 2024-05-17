import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IBooking, IRoom} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomForm} from "../../RoomForm";
import {DeleteModal} from "../../DeleteModal";
import {bookingService} from "../../../services";
import {TableModal} from "../../TableModal";
import {BookingsTable} from "../../BookingsTableContainer";

interface IProp {
    room: IRoom
}

const RoomRow: FC<IProp> = ({room}) => {
    const {hotels: {hotelsForManagement}, bookings: {trigger}} = useAppSelector(state => state);
    const [hotelName, setHotelName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showBookingsModal, setShowBookingsModal] = useState<boolean>(null)
    const [bookings, setBookings] = useState<IBooking[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowBookingsModal = () => setShowBookingsModal(true)

    const update = (updatedRoom: IRoom) => {
        dispatch(roomActions.update({roomId: room.id, room: updatedRoom}))
    }

    const deleteRoom = () => {
        dispatch(roomActions.deleteRoom({roomId: room.id}))
    }

    useEffect(() => {
        if (hotelsForManagement.length > 0) {
            const hotel = hotelsForManagement.find(hotel => hotel.id === room.hotelId);
            if (hotel) {
                setHotelName(hotel.name)
            }
        }
    }, [hotelsForManagement, room.hotelId]);

    useEffect(() => {
        if (showBookingsModal) {
            bookingService.getByRoomId(room.id).then(({data}) => setBookings(data))
        }
    }, [showBookingsModal, trigger, room.id]);

    return (
        <>
            <tr>
                <th>{room.id}</th>
                <th>{hotelName ? hotelName : 'Hotel not found'}</th>
                <th>{room.roomNumber}</th>
                <th>{room.capacity}</th>
                <th>{room.price}&#8372;</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingsModal}>View Bookings</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <RoomForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} room={room}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={room.roomNumber.toString()}
                         deleteAction={deleteRoom}/>
            <TableModal show={showBookingsModal} setShow={setShowBookingsModal}
                        title={`Bookings for ${room.roomNumber}`}>
                <BookingsTable bookings={bookings} manager/>
            </TableModal>
        </>
    );
};

export {
    RoomRow
}