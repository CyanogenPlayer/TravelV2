import {FC} from "react";

import {IUser} from "../../../interfaces";
import {Button} from "react-bootstrap";

interface IProp {
    user: IUser
}

const UserRow: FC<IProp> = ({user}) => {
    return (
        <tr>
            <th>{user.id}</th>
            <th>{user.username}</th>
            <th>{user.email}</th>
            <th>{user.roles}</th>
            <th>
                <Button variant="primary" disabled={true}>UpdateRoles</Button>
                <Button variant="primary" className="ms-1" disabled={true}>Delete</Button>
            </th>
        </tr>
    );
};

export {
    UserRow
}