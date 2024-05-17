import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../ErrorTextBox";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    roomNumber?: number,
    price: number,
    booking?: IBooking,

    submit: (booking: IBooking) => void
}

const BookingForm: FC<IProp> = ({show, setShow, roomNumber, price, booking, submit}) => {
    const [currentPrice, setCurrentPrice] = useState<number>(null)
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().substring(0, 10);
    };

    const [bookSince, setBookSince] = useState<string>(booking?.bookedSince.toString() || new Date().toISOString().substring(0, 10))
    const [bookTo, setBookTo] = useState<string>(booking?.bookedTo.toString() || getTomorrowDate())

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (booking: IBooking) => {
        booking.price = currentPrice
        submit(booking)
        handleClose()
    }

    useEffect(() => {
        if (show) {
            const difference = (new Date(bookTo).getTime() - new Date(bookSince).getTime()) / (1000 * 3600 * 24)
            setCurrentPrice(difference * price)
        }
    }, [show, bookSince, bookTo]);

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
                            defaultValue={bookSince}
                            {...register('bookedSince', {onChange: e => setBookSince(e.target.value)})}
                        />
                        {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Booking to</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={bookTo}
                            {...register('bookedTo', {onChange: e => setBookTo(e.target.value)})}
                        />
                        {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
                    </Form.Group>
                    {currentPrice ? <h5>Price: {currentPrice}&#8372;</h5> : null}
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