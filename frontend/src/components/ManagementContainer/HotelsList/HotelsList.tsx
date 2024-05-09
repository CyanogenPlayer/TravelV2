import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsTable} from "../../HotelsTableContainer";
import {IHotel} from "../../../interfaces";
import {HotelForm} from "../../HotelForm";

const HotelsList = () => {
    const {
        hotels: {hotelsForManagement, trigger},
        countries: {countriesForManagement}
    } = useAppSelector(state => state);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const [selectedCountryId, setSelectedCountryId] = useState<string>('')
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (hotel: IHotel) => {
        dispatch(hotelActions.create({hotel}))
    }

    const resetSelect = () => setSelectedCountryId('')

    useEffect(() => {
        if (selectedCountryId !== '') {
            dispatch(hotelActions.getByCountryId({countryId: selectedCountryId}))
        } else {
            dispatch(hotelActions.getAll())
        }
    }, [dispatch, trigger, selectedCountryId]);

    return (
        <div>
            <h2>Hotels: </h2>
            <Form.Group className="my-2">
                <Form.Label>By country</Form.Label>
                <Form.Select value={selectedCountryId} onChange={e => setSelectedCountryId(e.target.value)}>
                    <option value="">All</option>
                    {countriesForManagement && countriesForManagement.map(country =>
                        <option value={country.id}>{country.name}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelect}>
                Reset
            </Button>
            <HotelsTable hotels={hotelsForManagement}/>
            <Button variant="primary" onClick={handleShowCreateForm}>Add hotel</Button>
            <HotelForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
        </div>
    );
};

export {
    HotelsList
}