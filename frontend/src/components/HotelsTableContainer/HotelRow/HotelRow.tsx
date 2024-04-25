import {FC} from "react";

import {IHotel} from "../../../interfaces";

interface IProp {
    hotel: IHotel
}

const HotelRow: FC<IProp> = ({hotel}) => {
    return (
        <tr>
            <th>{hotel.id}</th>
            <th>{hotel.name}</th>
            <th>{hotel.countryName}</th>
            <th>ViewRooms/Update/Delete</th>
        </tr>
    );
};

export {
    HotelRow
}