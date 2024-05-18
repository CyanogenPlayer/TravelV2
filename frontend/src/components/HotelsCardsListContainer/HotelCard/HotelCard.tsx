import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";

import {IHotel} from "../../../interfaces";
import css from './HotelCard.module.css'
import {useAppSelector} from "../../../hooks";
import {baseURL, urls} from "../../../constants";

interface IProp {
    hotel: IHotel
}

const HotelCard: FC<IProp> = ({hotel}) => {
    const {countries} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)
    const navigate = useNavigate();

    const {id, name, countryId, photosIds} = hotel;

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
            <div className="d-flex justify-content-center align-items-center bg-dark rounded-top"
                 style={{height: '50%'}}>
                <img
                    src={photosIds.length > 0 ? `${baseURL}${urls.photos.byId(photosIds[0])}` : 'https://placehold.co/550x250?text=Image+Not+Found'}
                    style={{maxHeight: '100%', maxWidth: '100%', display: 'block'}} alt={hotel.name}/>
            </div>
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