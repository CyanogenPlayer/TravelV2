import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsTable} from "../../HotelsTableContainer";
import {ICountry, IHotel} from "../../../interfaces";
import {HotelForm} from "../../HotelForm";

const HotelsList = () => {
    const {
        hotels: {hotelsForManagement, trigger},
        countries: {countriesForManagement}
    } = useAppSelector(state => state);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const [selectedCountryId, setSelectedCountryId] = useState<string>('all')
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (hotel: IHotel) => {
        dispatch(hotelActions.create({hotel}))
    }

    useEffect(() => {
        if (selectedCountryId !== 'all') {
            dispatch(hotelActions.getByCountryId({countryId: selectedCountryId}))
        } else {
            dispatch(hotelActions.getAll())
        }
    }, [dispatch, trigger, selectedCountryId]);

    return (
        <div>
            <h2>Hotels: </h2>
            <Form.Select onChange={e => setSelectedCountryId(e.target.value)}>
                <option value="all" selected>All</option>
                {countriesForManagement && countriesForManagement.map(country =>
                    <option value={country.id}>{country.name}</option>
                )}
            </Form.Select>
            <HotelsTable hotels={hotelsForManagement}/>
            <Button variant="primary" onClick={handleShowCreateForm}>Add hotel</Button>
            <HotelForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
        </div>
    );
};

export {
    HotelsList
}