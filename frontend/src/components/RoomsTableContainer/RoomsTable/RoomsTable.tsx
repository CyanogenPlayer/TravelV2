import {Table} from "react-bootstrap";
import {FC} from "react";

import {RoomRow} from "../RoomRow";
import {IRoom} from "../../../interfaces";

interface IProp {
    rooms: IRoom[]
}

const RoomsTable: FC<IProp> = ({rooms}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>roomNumber</th>
                <th>capacity</th>
                <th>hotelId</th>
                <th>actions</th>
            </tr>
            </thead>
            <tbody>
            {rooms && rooms.map(room => <RoomRow key={room.id} room={room}/>)}
            </tbody>
        </Table>
    );
};

export {
    RoomsTable
}