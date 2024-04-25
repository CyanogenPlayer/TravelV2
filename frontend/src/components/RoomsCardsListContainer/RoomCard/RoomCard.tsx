import {FC, useState} from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IBooking, IRoom} from "../../../interfaces";
import css from "./RoomCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingValidator} from "../../../validators";
import {ErrorTextBox} from "../../ErrorTextBox";
import {bookingActions} from "../../../redux";


interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    const {id, roomNumber, capacity} = room;
    const {isAuth, user} = useAppSelector(state => state.auth);
    const [show, setShow] = useState(false)
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        reset()
    }

    const book = (booking: IBooking) => {
        booking.roomId = id
        booking.userId = user.id
        dispatch(bookingActions.create({booking}))
        handleClose()
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
            <Modal show={show} onHide={handleClose}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Want to book room {roomNumber}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="my-2">
                            <Form.Label>Booking since</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('bookedSince')}
                            />
                            {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>Booking to</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('bookedTo')}
                            />
                            {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit(book)} disabled={!isValid}>
                            Book
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export {
    RoomCard
}