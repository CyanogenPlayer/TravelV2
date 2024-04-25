import {FC} from "react";

import {IUser} from "../../../interfaces";

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
            <th>UpdateRoles/Delete</th>
        </tr>
    );
};

export {
    UserRow
}