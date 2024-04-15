import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useAppSelector} from "../../hooks";
import {BookingsTable} from "../../components";

const BookingsPage = () => {
    const {isAuth} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/auth')
        }
    }, [navigate, isAuth]);

    return (
        <div>
            <BookingsTable/>
        </div>
    );
};

export {
    BookingsPage
}