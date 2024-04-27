import {FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {countryActions, hotelActions, roomActions} from "../../redux";
import {CountryBadge} from "../CountriesBadgesListContainer";
import {RoomsCardsList} from "../RoomsCardsListContainer";
import {IBooking} from "../../interfaces";
import {SearchRoomsInPeriodForm} from "../SearchRoomsInPeriodForm";

interface IProp {
    hotelId: string
}

const HotelInfo: FC<IProp> = ({hotelId}) => {
    const {hotel} = useAppSelector(state => state.hotels);
    const {rooms} = useAppSelector(state => state.rooms);
    const {countries} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hotelActions.getById({hotelId}));
        dispatch(roomActions.getByHotelId({hotelId}));
    }, [dispatch, hotelId]);

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch]);

    useEffect(() => {
        if (hotel && countries.length > 0) {
            const country = countries.find(country => country.id === hotel.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [hotel, countries]);

    const viewRoomsInPeriod = (booking: IBooking) => {
        const {bookedSince, bookedTo} = booking;
        dispatch(roomActions.getAllAvailableForPeriod({hotelId, bookedSince, bookedTo}));
    }

    const resetRooms = () => {
        dispatch(roomActions.getByHotelId({hotelId}));
    }

    return (
        <>
            {hotel &&
                <div>
                    <h4>{hotel.name}</h4>
                    <h6>{hotel.id}</h6>
                    {countryName && <CountryBadge id={hotel.countryId} name={countryName}/>}
                    <SearchRoomsInPeriodForm viewRoomsInPeriod={viewRoomsInPeriod} resetRooms={resetRooms}/>
                    {rooms.length !== 0 && <RoomsCardsList rooms={rooms}/>}
                </div>
            }
        </>
    );
};

export {
    HotelInfo
}