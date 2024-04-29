import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IHotel} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelForm} from "../../HotelForm";

interface IProp {
    hotel: IHotel
}

const HotelRow: FC<IProp> = ({hotel}) => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)

    const update = (updatedHotel: IHotel) => {
        dispatch(hotelActions.update({hotelId: hotel.id, hotel: updatedHotel}))
    }

    useEffect(() => {
        if (countriesForManagement.length > 0) {
            const country = countriesForManagement.find(country => country.id === hotel.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countriesForManagement, hotel.countryId]);

    return (
        <tr>
            <th>{hotel.id}</th>
            <th>{hotel.name}</th>
            <th>{countryName ? countryName : 'Country not found'}</th>
            <th>
                <Button variant="primary" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                <Button variant="primary" className="me-1" disabled={true}>ViewRooms</Button>
                <Button variant="primary" className="me-1" disabled={true}>Delete</Button>
            </th>
            <HotelForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} hotel={hotel}/>
        </tr>
    );
};

export {
    HotelRow
}