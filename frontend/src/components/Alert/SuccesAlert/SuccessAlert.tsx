import {Alert} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {alertActions} from "../../../redux";

const SuccessAlert = () => {
    const {message} = useAppSelector(state => state.alerts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(alertActions.setMessage(null))
            }, 5000)
        }
    }, [dispatch, message]);

    return (
        <>
            {
                message &&
                <Alert className="position-absolute bottom-0 end-0 m-3" variant="success" dismissible>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>
                        {message}
                    </p>
                </Alert>
            }
        </>
    );
};

export {
    SuccessAlert
}