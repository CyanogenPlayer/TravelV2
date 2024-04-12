import {Card, Col} from "react-bootstrap";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions} from "../../../redux";
import {SignInForm} from "../SignInForm";
import {SignUpForm} from "../SignUpForm";

const AuthComponent = () => {
    const {isLogin, authError, message} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(authActions.setIsLogin(!isLogin))
    };

    return (
        <div className="d-flex justify-content-center">
            <Col xs={10} md={4}>
                <Card className="my-5 px-5 py-3">
                    {isLogin && <SignInForm authError={authError} handleToggle={handleToggle}/>}
                    {!isLogin && <SignUpForm authError={authError} handleToggle={handleToggle}/>}
                    {message && <div>{message}</div>} {/*TODO create popup with message*/}
                </Card>
            </Col>
        </div>
    );
};

export {
    AuthComponent
}