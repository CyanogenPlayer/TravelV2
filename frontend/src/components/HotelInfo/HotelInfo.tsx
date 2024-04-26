import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {countryActions, hotelActions, roomActions} from "../../redux";
import {CountryBadge} from "../CountriesBadgesListContainer";
import {RoomsCardsList} from "../RoomsCardsListContainer";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";

interface IProp {
    hotelId: string
}

const HotelInfo: FC<IProp> = ({hotelId}) => {
    const {hotel} = useAppSelector(state => state.hotels);
    const {rooms} = useAppSelector(state => state.rooms);
    const {countries} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });
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

    const viewRoomInPeriod = (booking: IBooking) => {
        const {bookedSince, bookedTo} = booking;
        dispatch(roomActions.getAllAvailableForPeriod({hotelId, bookedSince, bookedTo}));
    }

    const resetRooms = () => {
        dispatch(roomActions.getByHotelId({hotelId}));
        reset();
    }

    return (
        <>
            {hotel &&
                <div>
                    <h4>{hotel.name}</h4>
                    <h6>{hotel.id}</h6>
                    {countryName && <CountryBadge id={hotel.countryId} name={countryName}/>}
                    <form>
                        <Form.Group className="my-2">
                            <Form.Label>Since</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('bookedSince')}
                            />
                            {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="date"
                                {...register('bookedTo')}
                            />
                            {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
                        </Form.Group>
                        <Button size="sm" variant="primary" onClick={handleSubmit(viewRoomInPeriod)}
                                disabled={!isValid}>
                            Search
                        </Button>
                        <Button size="sm" variant="outline-primary" onClick={resetRooms}>
                            Reset
                        </Button>
                    </form>
                    {rooms.length !== 0 && <RoomsCardsList rooms={rooms}/>}
                </div>
            }
        </>
    );
};

export {
    HotelInfo
}