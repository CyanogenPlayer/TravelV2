import {Table} from "react-bootstrap";
import {FC} from "react";

import {UserRow} from "../UserRow";
import {IUser} from "../../../interfaces";

interface IProp {
    users: IUser[]
}

const UsersTable: FC<IProp> = ({users}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Enabled</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users && users.map(user => <UserRow key={user.id} user={user}/>)}
            </tbody>
        </Table>
    );
};

export {
    UsersTable
}