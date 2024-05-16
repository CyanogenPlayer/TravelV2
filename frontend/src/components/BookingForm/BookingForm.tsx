import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../ErrorTextBox";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    roomNumber?: number,
    booking?: IBooking,

    submit: (booking: IBooking) => void
}

const BookingForm: FC<IProp> = ({show, setShow, roomNumber, submit, booking}) => {
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (booking: IBooking) => {
        submit(booking)
        handleClose()
    }

    useEffect(() => {
        if (booking) {
            setValue('bookedSince', booking.bookedSince)
            setValue('bookedTo', booking.bookedTo)
        }
    }, [setValue, booking]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{booking ? 'Update booking' : `Want to book room ${roomNumber}?`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>Booking since</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={booking ? booking.bookedSince.toString() : null}
                            {...register('bookedSince')}
                        />
                        {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Booking to</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={booking ? booking.bookedTo.toString() : null}
                            {...register('bookedTo')}
                        />
                        {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" disabled={!isValid}>
                        {booking ? 'Update' : 'Book'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    BookingForm
}