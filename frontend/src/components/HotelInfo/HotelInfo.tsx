import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {countryActions, hotelActions, roomActions} from "../../redux";
import {CountryBadge} from "../CountriesListContainer";
import {RoomsList} from "../RoomsListContainer";

interface IProp {
    hotelId: string
}

const HotelInfo: FC<IProp> = ({hotelId}) => {
    const {hotel} = useAppSelector(state => state.hotels);
    const {rooms} = useAppSelector(state => state.rooms);
    const {country} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hotelActions.getById({hotelId}));
        dispatch(roomActions.getByHotelId({hotelId}));
    }, [dispatch, hotelId]);

    useEffect(() => {
        if (hotel) {
            dispatch(countryActions.getById({countryId: hotel.countryId}));
        }
    }, [dispatch, hotel]);

    return (
        <>
            {hotel &&
                <div>
                    <h4>{hotel.name}</h4>
                    <h6>{hotel.id}</h6>
                    {country && <CountryBadge id={country.id} name={country.name}/>}
                    {rooms.length !== 0 && <RoomsList rooms={rooms}/>}
                </div>
            }
        </>
    );
};

export {
    HotelInfo
}