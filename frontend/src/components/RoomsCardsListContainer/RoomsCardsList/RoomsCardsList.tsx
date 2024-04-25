import {FC} from "react";

import {IRoom} from "../../../interfaces";
import {RoomCard} from "../RoomCard";

interface IProp {
    rooms: IRoom[]
}

const RoomsCardsList: FC<IProp> = ({rooms}) => {
    return (
        <>
            <p>Rooms:</p>
            <div>
                {rooms && rooms.map(room => <RoomCard key={room.id} room={room}/>)}
            </div>
        </>
    );
};

export {
    RoomsCardsList
}