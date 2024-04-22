import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Spinner} from "react-bootstrap";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import {ErrorAlert, Header, SuccessAlert} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux";

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(state => state.loading);

    useEffect(() => {
        if (authService.getToken()) {
            dispatch(authActions.checkTokenAndFetchUser());
        }
    }, [dispatch]);

    return (
        <LoadingOverlayWrapper
            active={loading}
            spinner={<Spinner animation="grow"/>}
            styles={{
                overlay: base => ({
                    ...base,
                    background: 'rgba(66,66,66,0.5)'
                }),
                wrapper: {
                    height: '100%'
                }
            }}
        >
            <Header/>
            <Outlet/>
            <ErrorAlert/>
            <SuccessAlert/>
        </LoadingOverlayWrapper>
    );
};

export {
    MainLayout
}