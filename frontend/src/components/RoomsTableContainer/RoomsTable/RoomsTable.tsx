import {Table} from "react-bootstrap";
import {FC} from "react";

import {RoomRow} from "../RoomRow";
import {IRoom} from "../../../interfaces";

interface IProp {
    rooms: IRoom[]
}

const RoomsTable: FC<IProp> = ({rooms}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Hotel</th>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Enabled</th>
                <th>Actions</th>
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