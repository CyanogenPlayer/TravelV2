import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {roomActions} from "../../../../redux";
import {RoomRow} from "../RoomRow";

const RoomsTable = () => {
    const {rooms} = useAppSelector(state => state.rooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(roomActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Rooms: </h2>
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
            <h6>add room</h6>
        </div>
    );
};

export {
    RoomsTable
}