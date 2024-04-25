import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomsTable} from "../../RoomsTableContainer";

const RoomsList = () => {
    const {roomsForManagement} = useAppSelector(state => state.rooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(roomActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Rooms: </h2>
            <RoomsTable rooms={roomsForManagement}/>
            <h6>add room</h6>
        </div>
    );
};

export {
    RoomsList
}