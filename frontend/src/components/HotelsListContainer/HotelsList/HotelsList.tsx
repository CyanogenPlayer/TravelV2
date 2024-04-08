import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsListCard} from "../HotelsListCard";

const HotelsList = () => {
    const {hotels} = useAppSelector(state => state.hotels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hotelActions.getAll())
    }, [dispatch]);

    return (
        <div>
            {hotels.map(hotel => <HotelsListCard key={hotel.id} hotel={hotel}/>)}
        </div>
    );
};

export {
    HotelsList
}