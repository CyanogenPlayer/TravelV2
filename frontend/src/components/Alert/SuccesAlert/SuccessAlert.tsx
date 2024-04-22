import {Alert} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {alertActions} from "../../../redux";

const SuccessAlert = () => {
    const {message} = useAppSelector(state => state.alerts);
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
                setTimeout(() => {
                    dispatch(alertActions.setMessage(null))
                }, 500)
            }, 5000)
        }
    }, [dispatch, message]);

    return (
        <Alert className="position-absolute bottom-0 end-0 m-3" variant="success" show={show}
               onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Success!</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    );
};

export {
    SuccessAlert
}