import {Table} from "react-bootstrap";
import {FC} from "react";

import {UserRow} from "../UserRow";
import {IUser} from "../../../interfaces";

interface IProp {
    users: IUser[]
}

const UsersTable: FC<IProp> = ({users}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>username</th>
                <th>email</th>
                <th>role</th>
                <th>actions</th>
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