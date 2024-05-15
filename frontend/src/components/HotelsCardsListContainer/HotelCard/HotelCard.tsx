import {FC, useEffect, useState} from "react";
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
    const [countryName, setCountryName] = useState<string>(null)
    const navigate = useNavigate();

    const {id, name, countryId, photosUrls} = hotel;

    const navigateToHotelInfo = () => {
        navigate(`${id}`)
    }

    useEffect(() => {
        if (countries.length > 0) {
            const country = countries.find(country => country.id === countryId)
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countries, countryId]);

    return (
        <Card border="primary" className={css.HotelCard} onClick={navigateToHotelInfo}>
            <Card.Img variant="top"
                      src={photosUrls.length > 0 ? photosUrls[0] : 'https://placehold.co/550x250?text=Image+Not+Found'}
                      style={{height: '50%'}}/>
            <Card.Header>
                <Card.Title>{name}</Card.Title>
                <Card.Text style={{fontSize: 'smaller'}}>id: {id}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>{countryName ? countryName : 'Country not found'}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export {
    HotelCard
}