import {Carousel} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {countryActions, hotelActions, roomActions} from "../../redux";
import {CountryBadge} from "../CountriesBadgesListContainer";
import {RoomsCardsList} from "../RoomsCardsListContainer";
import {IBooking} from "../../interfaces";
import {SearchRoomsInPeriodForm} from "../SearchRoomsInPeriodForm";
import {baseURL, urls} from "../../constants";

interface IProp {
    hotelId: string
}

const HotelInfo: FC<IProp> = ({hotelId}) => {
    const {hotels: {hotel}, rooms: {rooms}, countries: {countries}} =
        useAppSelector(state => state);
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
        if (hotel && countries.length) {
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
                    <div className="d-flex justify-content-between flex-wrap-reverse">
                        <div>
                            <h4>{hotel.name}</h4>
                            <h6>id: {hotel.id}</h6>
                            {countryName && <CountryBadge id={hotel.countryId} name={countryName}/>}
                        </div>
                        {hotel.photosIds.length > 0 &&
                            <Carousel className="col-12 col-md-7 my-2 my-md-0 bg-dark z-0">
                                {hotel.photosIds.map(photoId =>
                                    <Carousel.Item interval={10000}>
                                        <div className="d-flex justify-content-center" style={{height: '20rem'}}>
                                            <img src={`${baseURL}${urls.photos.byId(photoId)}`} alt={hotel.name}
                                                 style={{maxWidth: '100%', maxHeight: '100%', display: 'block'}}/>
                                        </div>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        }
                    </div>
                    <SearchRoomsInPeriodForm viewRoomsInPeriod={viewRoomsInPeriod} resetRooms={resetRooms}/>
                    {rooms.length > 0 && <RoomsCardsList rooms={rooms}/>}
                </div>
            }
        </>
    );
};

export {
    HotelInfo
}