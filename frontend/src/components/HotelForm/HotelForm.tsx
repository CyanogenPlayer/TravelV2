import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IHotel} from "../../interfaces";
import {hotelValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";
import {useAppSelector} from "../../hooks";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    hotel?: IHotel,

    submit: (hotel: IHotel) => void
}

const HotelForm: FC<IProp> = ({show, setShow, submit, hotel}) => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IHotel>({
        mode: 'onTouched',
        resolver: joiResolver(hotelValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (hotel: IHotel) => {
        submit(hotel)
        handleClose()
    }

    useEffect(() => {
        if (hotel) {
            setValue('name', hotel.name)
            if (countriesForManagement.length > 0) {
                setValue('countryId', hotel.countryId ? hotel.countryId : countriesForManagement[0].id)
            }
        }
    }, [setValue, hotel, countriesForManagement]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{hotel ? `Update ${hotel.name}` : 'Add hotel'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>Hotel name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={hotel ? hotel.name : null}
                            {...register('name')}
                        />
                        {errors.name && <ErrorTextBox error={errors.name.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            defaultValue={hotel ? hotel.countryId : 0}
                            {...register('countryId')}
                        >
                            {countriesForManagement && countriesForManagement.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Select>
                        {errors.countryId && <ErrorTextBox error={errors.countryId.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" disabled={!isValid}>
                        {hotel ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    HotelForm
}