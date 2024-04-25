import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

interface IProp {
    id?: string,
    name: string
}

const CountryBadge: FC<IProp> = ({id, name}) => {
    const navigate = useNavigate();

    const navigateToHotels = () => {
        if (id) {
            navigate(`/hotels?country=${id}`)
        }
        else {
            navigate(`/hotels`)
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