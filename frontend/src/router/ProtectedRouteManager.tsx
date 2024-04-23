import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {decodeJwt} from "jose";

import {authService} from "../services";
import {JwtType} from "../types";
import {ERole} from "../enums";

const ProtectedRouteManager = () => {
    const navigate = useNavigate();
    const token = authService.getToken();

    useEffect(() => {
        if (token && !decodeJwt<JwtType>(token).roles.includes(ERole.ROLE_MANAGER)) {
            navigate('/')
        }
    }, [navigate, token]);


    if (!token) {
        return <Navigate to="/"/>
    } else if (decodeJwt<JwtType>(token).roles.includes(ERole.ROLE_MANAGER) &&
        Date.now() <= decodeJwt<JwtType>(token).exp * 1000) {
        return <Outlet/>;
    }
    return <Navigate to="/"/>
};

export {
    ProtectedRouteManager
}