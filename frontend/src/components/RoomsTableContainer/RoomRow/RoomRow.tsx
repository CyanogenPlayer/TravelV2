import {FC} from "react";

import {IRoom} from "../../../interfaces";

interface IProp {
    room: IRoom
}

const RoomRow: FC<IProp> = ({room}) => {
    return (
        <tr>
            <th>{room.id}</th>
            <th>{room.roomNumber}</th>
            <th>{room.capacity}</th>
            <th>{room.hotelId}</th>
            <th>Update/ViewBookings/Delete</th>
        </tr>
    );
};

export {
    RoomRow
}