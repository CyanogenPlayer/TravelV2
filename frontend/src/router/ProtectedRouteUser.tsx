import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {decodeJwt} from "jose";

import {authService} from "../services";
import {ERole} from "../enums";
import {JwtType} from "../types";

const ProtectedRouteUser = () => {
    const navigate = useNavigate();
    const token = authService.getToken();

    useEffect(() => {
        if (token && !decodeJwt<JwtType>(token).roles.includes(ERole.ROLE_USER)) {
            navigate('/auth')
        }
    }, [navigate, token]);


    if (!token) {
        return <Navigate to="/auth"/>
    } else if (decodeJwt<JwtType>(token).roles.includes(ERole.ROLE_USER) &&
        Date.now() <= decodeJwt<JwtType>(token).exp * 1000) {
        return <Outlet/>;
    }
    return <Navigate to="/auth"/>
};

export {
    ProtectedRouteUser
}