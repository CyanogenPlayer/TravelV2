import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const image = require('../../assets/logo.png');

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('')
    }

    return (
        <Navbar expand="lg" className="bg-secondary bg-gradient justify-content-center">
            <Container className="justify-content-between">
                <Navbar.Brand onClick={navigateHome} style={{cursor: 'pointer'}}>
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
                        <Nav.Link onClick={navigateHome}>Home</Nav.Link>
                        <Nav.Link href="">SignIn/SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export {
    Header
}