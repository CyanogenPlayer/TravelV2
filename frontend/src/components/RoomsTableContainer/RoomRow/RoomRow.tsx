import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IRoom} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomForm} from "../../RoomForm";
import {DeleteModal} from "../../DeleteModal";

interface IProp {
    room: IRoom
}

const RoomRow: FC<IProp> = ({room}) => {
    const {hotelsForManagement} = useAppSelector(state => state.hotels);
    const [hotelName, setHotelName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)

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

    return (
        <>
            <tr>
                <th>{room.id}</th>
                <th>{room.roomNumber}</th>
                <th>{room.capacity}</th>
                <th>{hotelName ? hotelName : 'Hotel not found'}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="primary" className="me-1" disabled={true}>View bookings</Button>
                    <Button variant="primary" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <RoomForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} room={room}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={room.roomNumber.toString()}
                         deleteAction={deleteRoom}/>
        </>
    );
};

export {
    RoomRow
}