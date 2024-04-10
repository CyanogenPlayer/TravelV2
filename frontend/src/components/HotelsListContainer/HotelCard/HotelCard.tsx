import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";

import {ICountry, IHotel} from "../../../interfaces";
import css from './HotelCard.module.css'
import {countryService} from "../../../services";

interface IProp {
    hotel: IHotel
}

const HotelCard: FC<IProp> = ({hotel}) => {
    const {id, name, countryId} = hotel;

    const [country, setCountry] = useState<ICountry>(null)
    const navigate = useNavigate();

    useEffect(() => {
        countryService.getById(countryId).then(({data}) => setCountry(data))
    }, [countryId]);

    const navigateToHotelInfo = () => {
        navigate(`${id}`)
    }

    return (
        <>
            {country &&
                <Card border="primary" className={css.HotelCard} onClick={navigateToHotelInfo}>
                    <Card.Header>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text style={{fontSize: 'smaller'}}>{id}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle>{country.name}</Card.Subtitle>
                    </Card.Body>
                </Card>
            }
        </>
    );
};

export {
    HotelCard
}