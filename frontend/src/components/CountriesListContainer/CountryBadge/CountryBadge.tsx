import {FC} from "react";
import {useNavigate} from "react-router-dom";

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
        <div>
            <button onClick={navigateToHotels}>{name}</button>
        </div>
    );
};

export {
    CountryBadge
}