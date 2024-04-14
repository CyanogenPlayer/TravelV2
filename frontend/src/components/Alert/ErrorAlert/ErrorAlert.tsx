import {Alert} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {alertActions} from "../../../redux";

const ErrorAlert = () => {
    const {error} = useAppSelector(state => state.alerts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(alertActions.setError(null))
            }, 5000)
        }
    }, [dispatch, error]);

    return (
        <>
            {
                error &&
                <Alert className="position-absolute bottom-0 end-0 m-3" variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                        {error}
                    </p>
                </Alert>
            }
        </>
    );
};

export {
    ErrorAlert
}