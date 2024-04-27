import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomsTable} from "../../RoomsTableContainer";
import {IRoom} from "../../../interfaces";
import {RoomForm} from "../../RoomForm";

const RoomsList = () => {
    const {roomsForManagement, trigger} = useAppSelector(state => state.rooms);
    const [showCreateForm, setShowCreateForm] = useState(false)
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (room: IRoom) => {
        dispatch(roomActions.create({room}))
    }

    useEffect(() => {
        dispatch(roomActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div>
            <h2>Rooms: </h2>
            <RoomsTable rooms={roomsForManagement}/>
            <Button variant="primary" onClick={handleShowCreateForm}>Add room</Button>
            <RoomForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
        </div>
    );
};

export {
    RoomsList
}