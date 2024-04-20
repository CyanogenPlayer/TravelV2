import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";

import {IHotel} from "../../../interfaces";
import css from './HotelCard.module.css'

interface IProp {
    hotel: IHotel
}

const HotelCard: FC<IProp> = ({hotel}) => {
    const {id, name, countryName} = hotel;

    const navigate = useNavigate();

    const navigateToHotelInfo = () => {
        navigate(`${id}`)
    }

    return (
        <>
            <Card border="primary" className={css.HotelCard} onClick={navigateToHotelInfo}>
                <Card.Header>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text style={{fontSize: 'smaller'}}>id: {id}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>{countryName}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
};

export {
    HotelCard
}