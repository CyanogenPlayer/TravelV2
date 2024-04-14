import {Outlet} from "react-router-dom";
import {useEffect} from "react";

import {ErrorAlert, Header, SuccessAlert} from "../../components";
import {useAppDispatch} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authService.getToken()) {
            dispatch(authActions.checkTokenAndFetchUser());
        }
    }, [dispatch]);

    return (
        <div>
            <Header/>
            <Outlet/>
            <ErrorAlert/>
            <SuccessAlert/>
        </div>
    );
};

export {
    MainLayout
}