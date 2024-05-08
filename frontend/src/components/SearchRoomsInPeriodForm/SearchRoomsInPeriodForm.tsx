import {Button, Form} from "react-bootstrap";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../ErrorTextBox";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";

interface IProp {
    viewRoomsInPeriod: (booking: IBooking) => void,
    resetRooms: () => void
}

const SearchRoomsInPeriodForm: FC<IProp> = ({viewRoomsInPeriod, resetRooms}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });

    const resetForm = () => {
        resetRooms()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(viewRoomsInPeriod)}>
            <Form.Group className="my-2">
                <Form.Label>Since</Form.Label>
                <Form.Control
                    type="date"
                    {...register('bookedSince')}
                />
                {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
            </Form.Group>
            <Form.Group className="my-2">
                <Form.Label>To</Form.Label>
                <Form.Control
                    type="date"
                    {...register('bookedTo')}
                />
                {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
            </Form.Group>
            <Button type="submit" size="sm" variant="primary"
                    disabled={!isValid}>
                Search
            </Button>
            <Button size="sm" variant="outline-primary" onClick={resetForm}>
                Reset
            </Button>
        </form>
    );
};

export {
    SearchRoomsInPeriodForm
}