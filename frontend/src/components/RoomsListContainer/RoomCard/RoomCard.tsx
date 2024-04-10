import {FC} from "react";
import {Button, Card} from "react-bootstrap";

import {IRoom} from "../../../interfaces";
import css from "./RoomCard.module.css"

interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    const {id, roomNumber, capacity} = room;

    return (
        <Card border="primary" className={css.RoomCard}>
            <Card.Header>
                <Card.Title>{roomNumber}</Card.Title>
                <Card.Text style={{fontSize: 'smaller'}}>{id}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>capacity: {capacity}</Card.Subtitle>
                <Button variant="primary" disabled={true}>Book</Button>
            </Card.Body>
        </Card>
    );
};

export {
    RoomCard
}