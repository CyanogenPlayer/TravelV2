import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICountry} from "../../interfaces";
import {countryValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";

interface IProp{
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    country?: ICountry

    submit: (country: ICountry) => void
}

const CountryForm: FC<IProp> = ({show, setShow, submit, country}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<ICountry>({
        mode: 'onTouched',
        resolver: joiResolver(countryValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (country: ICountry) => {
        submit(country)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>{country ? 'Update ' + country.name: 'Create country'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>Country name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={country ? country.name: null}
                            {...register('name')}
                        />
                        {errors.name && <ErrorTextBox error={errors.name.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit(handleForm)} disabled={!isValid}>
                        {country ? 'Update ': 'Create'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    CountryForm
}