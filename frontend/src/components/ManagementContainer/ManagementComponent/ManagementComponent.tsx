import {useEffect, useState} from "react";

import {useAppSelector} from "../../../hooks";
import {ERole} from "../../../enums";
import {CountriesTable} from "../CountriesTableContainer";
import {HotelsTable} from "../HotelsTableContainer";
import {RoomsTable} from "../RoomsTableContainer";
import {BookingsTable} from "../BookingsTableContainer";
import {UsersTable} from "../UsersTableContainer";

const ManagementComponent = () => {
    const {user} = useAppSelector(state => state.auth);
    const [roles, setRoles] = useState<ERole[]>([])

    useEffect(() => {
        if (user) {
            setRoles(user.roles)
        }
    }, [user]);

    return (
        <>
            {roles.includes(ERole.ROLE_MANAGER) &&
                <div>
                    <CountriesTable/>
                    <HotelsTable/>
                    <RoomsTable/>
                    <UsersTable/>
                    <BookingsTable/>
                </div>
            }
        </>
    );
};

export {
    ManagementComponent
}