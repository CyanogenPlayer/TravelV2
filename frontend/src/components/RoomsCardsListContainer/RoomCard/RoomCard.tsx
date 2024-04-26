import {FC, useState} from "react";
import {Button, Card} from "react-bootstrap";

import {IBooking, IRoom} from "../../../interfaces";
import css from "./RoomCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {BookingForm} from "../../BookingForm";
import {bookingActions} from "../../../redux";

interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    const {id, roomNumber, capacity} = room;
    const {isAuth, user} = useAppSelector(state => state.auth);
    const [show, setShow] = useState(false)
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true)

    const book = (booking: IBooking) => {
        booking.roomId = id
        booking.userId = user.id
        dispatch(bookingActions.create({booking}))
    }

    return (
        <>
            <Card border="primary" className={css.RoomCard}>
                <Card.Header>
                    <Card.Title>{roomNumber}</Card.Title>
                    <Card.Text style={{fontSize: 'smaller'}}>{id}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>capacity: {capacity}</Card.Subtitle>
                    <Button variant="primary" disabled={!isAuth} onClick={handleShow}>Book</Button>
                </Card.Body>
            </Card>
            <BookingForm show={show} setShow={setShow} roomNumber={roomNumber} book={book}/>
        </>
    );
};

export {
    RoomCard
}