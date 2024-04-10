import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IHotel} from "../../../interfaces";
import css from './HotelsListCard.module.css'

interface IProp {
    hotel: IHotel
}

const HotelsListCard: FC<IProp> = ({hotel}) => {
    const {id, name, countryId} = hotel;

    const navigate = useNavigate();

    const navigateToHotelInfo = () => {
        navigate(`${id}`)
    }

    return (
        <div className={css.MoviesListCard} onClick={navigateToHotelInfo}>
            <div className={css.Container}>
                <div>id: {id}</div>
                <h4>name: {name}</h4>
                <div>countryId: {countryId}</div>
            </div>
        </div>
    );
};

export {
    HotelsListCard
}