import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../ErrorTextBox";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    roomNumber: number

    book: (booking: IBooking) => void
}

const BookingForm: FC<IProp> = ({show, setShow, roomNumber, book}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleBook = (booking: IBooking) => {
        book(booking)
        handleClose()
    }

    return (
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
                    <Button variant="primary" onClick={handleSubmit(handleBook)} disabled={!isValid}>
                        Book
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    BookingForm
}