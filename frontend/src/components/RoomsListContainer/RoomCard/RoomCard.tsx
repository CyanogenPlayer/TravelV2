import {FC, useState} from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";

import {IRoom} from "../../../interfaces";
import css from "./RoomCard.module.css"
import {useAppSelector} from "../../../hooks";


interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    const {id, roomNumber, capacity} = room;
    const {isAuth} = useAppSelector(state => state.auth);
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleSubmit = () => {
        setShow(false)
    }

    return (
        <>
            <Card border="primary" className={css.RoomCard}>
                <Card.Header>
                    <Card.Title>{roomNumber}</Card.Title>
                    <Card.Text style={{fontSize: 'smaller'}}>{id}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>capacity: {capacity}</Card.Subtitle>
                    <Button variant="primary" disabled={!isAuth} onClick={handleShow}>Book</Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={() => setShow(false)}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title>Want to book room {roomNumber}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="my-2">
                            <Form.Label>Booking since</Form.Label>
                            <Form.Control
                                type="date"
                            />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>Booking to</Form.Label>
                            <Form.Control
                                type="date"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>
                            Book
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export {
    RoomCard
}