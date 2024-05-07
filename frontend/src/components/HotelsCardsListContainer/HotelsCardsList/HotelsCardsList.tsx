import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelCard} from "../HotelCard";

interface IProp {
    countryId: string
}

const HotelsCardsList: FC<IProp> = ({countryId}) => {
    const {hotels} = useAppSelector(state => state.hotels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (countryId && countryId !== '') {
            dispatch(hotelActions.getByCountryId({countryId}))
        } else {
            dispatch(hotelActions.getAll())
        }
    }, [dispatch, countryId]);

    return (
        <div className="d-flex flex-wrap justify-content-around">
            {hotels && hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel}/>)}
        </div>
    );
};

export {
    HotelsCardsList
}