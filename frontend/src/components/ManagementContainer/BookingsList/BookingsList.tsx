import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {BookingsTable} from "../../BookingsTableContainer";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";

const BookingsList = () => {
    const {
        bookings: {bookingsForManagement, trigger},
        rooms: {roomsForManagement},
        users: {users}
    } = useAppSelector(state => state);
    const [open, setOpen] = useState<boolean>(null)
    const [selectedRoomId, setSelectedRoomId] = useState<string>('')
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [roomSelectDisabled, setRoomSelectDisabled] = useState<boolean>(null)
    const [userSelectDisabled, setUserSelectDisabled] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const resetSelects = () => {
        setSelectedRoomId('')
        setSelectedUserId('')
    }

    useEffect(() => {
        if (selectedRoomId !== '') {
            setUserSelectDisabled(true)
            dispatch(bookingActions.getByRoomId({roomId: selectedRoomId}))
        } else if (selectedUserId !== '') {
            setRoomSelectDisabled(true)
            dispatch(bookingActions.getByUserId({userId: selectedUserId}))
        } else {
            setRoomSelectDisabled(false)
            setUserSelectDisabled(false)
            dispatch(bookingActions.getAll())
        }
    }, [dispatch, trigger, selectedRoomId, selectedUserId]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Bookings</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <Form.Group className="my-2">
                        <Form.Label>By room</Form.Label>
                        <Form.Select value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)}
                                     disabled={roomSelectDisabled}>
                            <option value="">All</option>
                            {roomsForManagement && roomsForManagement.map(room =>
                                <option value={room.id}>{room.roomNumber}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>By user</Form.Label>
                        <Form.Select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}
                                     disabled={userSelectDisabled}>
                            <option value="">All</option>
                            {users && users.map(user =>
                                <option value={user.id}>{user.username}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelects}>
                        Reset
                    </Button>
                    <BookingsTable bookings={bookingsForManagement}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    BookingsList
}