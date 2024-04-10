import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

interface IProp {
    id?: string,
    name: string
}

const CountryBadge: FC<IProp> = ({id, name}) => {
    const navigate = useNavigate();

    const toAllHotels = () => {
        navigate(`/hotels`)
    }

    const toHotelsByCountry = (id: string) => {
        navigate(`/hotels?country=${id}`)
    }

    const navigateToHotels = () => {
        if (id) {
            toHotelsByCountry(id)
        }
        else {
            toAllHotels()
        }
    }

    return (
        <>
            <Button variant="secondary" onClick={navigateToHotels}>{name}</Button>
        </>
    );
};

export {
    CountryBadge
}