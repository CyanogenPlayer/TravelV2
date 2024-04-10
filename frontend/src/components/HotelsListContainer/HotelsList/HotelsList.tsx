import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsListCard} from "../HotelsListCard";

interface IProp {
    countryId: string
}

const HotelsList: FC<IProp> = ({countryId}) => {
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
        <div>
            {hotels.map(hotel => <HotelsListCard key={hotel.id} hotel={hotel}/>)}
        </div>
    );
};

export {
    HotelsList
}