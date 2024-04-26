import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";

import {IHotel} from "../../../interfaces";
import css from './HotelCard.module.css'
import {useAppSelector} from "../../../hooks";

interface IProp {
    hotel: IHotel
}

const HotelCard: FC<IProp> = ({hotel}) => {
    const {countries} = useAppSelector(state => state.countries);
    const navigate = useNavigate();

    const {id, name, countryId} = hotel;
    const countryName = countries.find(country => country.id === hotel.countryId).name

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
                    <Card.Subtitle>{countryName ? countryName: 'Country not found'}</Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    );
};

export {
    HotelCard
}