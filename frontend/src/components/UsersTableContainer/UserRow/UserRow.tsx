import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IBooking, IUser} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../redux";
import {UserRoleForm} from "../../UserRoleForm";
import {bookingService} from "../../../services";
import {TableModal} from "../../TableModal";
import {BookingsTable} from "../../BookingsTableContainer";

interface IProp {
    user: IUser
}

const UserRow: FC<IProp> = ({user}) => {
    const {trigger} = useAppSelector(state => state.bookings);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showBookingsModal, setShowBookingsModal] = useState<boolean>(null)
    const [bookings, setBookings] = useState<IBooking[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowBookingsModal = () => setShowBookingsModal(true)

    const update = (updatedUser: IUser) => {
        dispatch(userActions.updateRoles({userId: user.id, user: updatedUser}))
    }

    useEffect(() => {
        if (showBookingsModal) {
            bookingService.getByUserId(user.id).then(({data}) => setBookings(data))
        }
    }, [showBookingsModal, trigger, user.id]);

    return (
        <>
            <tr>
                <th>{user.id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.roles.toString()}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingsModal}>View Bookings</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update Roles</Button>
                </th>
            </tr>
            <UserRoleForm show={showUpdateForm} setShow={setShowUpdateForm} user={user} submit={update}/>
            <TableModal show={showBookingsModal} setShow={setShowBookingsModal} title={`Bookings of ${user.username}`}>
                <BookingsTable bookings={bookings}/>
            </TableModal>
        </>
    );
};

export {
    UserRow
}