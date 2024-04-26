import {FC, useEffect, useState} from "react";

import {IHotel} from "../../../interfaces";
import {useAppSelector} from "../../../hooks";

interface IProp {
    hotel: IHotel
}

const HotelRow: FC<IProp> = ({hotel}) => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)

    useEffect(() => {
        if (countriesForManagement.length > 0) {
            const country = countriesForManagement.find(country => country.id === hotel.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countriesForManagement]);

    return (
        <tr>
            <th>{hotel.id}</th>
            <th>{hotel.name}</th>
            <th>{countryName ? countryName: 'Country not found'}</th>
            <th>Update/ViewRooms/Delete</th>
        </tr>
    );
};

export {
    HotelRow
}