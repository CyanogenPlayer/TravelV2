import {FC} from "react";

import {IRoom} from "../../../interfaces";

interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    return (
        <div>
            <div>id: {room.id}</div>
            <div>roomNumber: {room.roomNumber}</div>
            <div>capacity: {room.capacity}</div>
            TODO add booking button if user logged in
        </div>
    );
};

export {
    RoomCard
}