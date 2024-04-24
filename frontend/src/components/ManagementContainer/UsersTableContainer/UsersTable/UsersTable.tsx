import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {userActions} from "../../../../redux";
import {UserRow} from "../UserRow";

const UsersTable = () => {
    const {users} = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Users:</h2>
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
        </div>
    );
};

export {
    UsersTable
}