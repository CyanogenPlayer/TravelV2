import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

const Header = () => {
    const image = require('../../assets/logo.png');

    const navigate = useNavigate();
    const {isAuth, user} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const navigateToHome = () => {
        navigate('')
    }

    const navigateToAuthorization = () => {
        navigate('/auth')
    }

    const logOut = () => {
        dispatch(authActions.logOut())
    }

    return (
        <Navbar expand="lg" className="bg-secondary bg-gradient justify-content-center">
            <Container className="justify-content-between">
                <Navbar.Brand onClick={navigateToHome} style={{cursor: 'pointer'}}>
                    <img
                        alt="JourneyJolt"
                        src={image}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    JourneyJolt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link onClick={navigateToHome}>Home</Nav.Link>
                        {
                            isAuth ?
                                <div className="navbar-nav">
                                    <div className="nav-link">User: {user.username}</div>
                                    <Nav.Link onClick={logOut}>LogOut</Nav.Link>
                                </div>
                                :
                                <Nav.Link onClick={navigateToAuthorization}>SignIn/SignUp</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export {
    Header
}