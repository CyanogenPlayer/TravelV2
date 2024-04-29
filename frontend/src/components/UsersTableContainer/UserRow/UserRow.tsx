import {Button} from "react-bootstrap";
import {FC, useState} from "react";

import {IUser} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {userActions} from "../../../redux";
import {UserRoleForm} from "../../UserRoleForm";

interface IProp {
    user: IUser
}

const UserRow: FC<IProp> = ({user}) => {
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)

    const update = (updatedUser: IUser) => {
        dispatch(userActions.updateRoles({userId: user.id, user: updatedUser}))
    }

    return (
        <tr>
            <th>{user.id}</th>
            <th>{user.username}</th>
            <th>{user.email}</th>
            <th>{user.roles.toString()}</th>
            <th>
                <Button variant="primary" className="me-1" onClick={handleShowUpdateForm}>UpdateRoles</Button>
                <Button variant="primary" className="me-1" disabled={true}>ViewBookings</Button>
                <Button variant="primary" className="me-1" disabled={true}>Delete</Button>
            </th>
            <UserRoleForm show={showUpdateForm} setShow={setShowUpdateForm} user={user} submit={update}/>
        </tr>
    );
};

export {
    UserRow
}