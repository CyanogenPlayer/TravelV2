import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../redux";
import {UsersTable} from "../../UsersTableContainer";

const UsersList = () => {
    const {users} = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Users:</h2>
            <UsersTable users={users}/>
        </div>
    );
};

export {
    UsersList
}