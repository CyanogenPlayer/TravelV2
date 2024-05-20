import {Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

import {IBooking, ICountry, IHotel, IRoom, IUser} from "../../interfaces";
import {countryService, hotelService, roomService, userService} from "../../services";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    booking: IBooking
}

const BookingDetailsModal: FC<IProp> = ({show, setShow, booking}) => {
    const [country, setCountry] = useState<ICountry>(null)
    const [hotel, setHotel] = useState<IHotel>(null)
    const [room, setRoom] = useState<IRoom>(null)
    const [user, setUser] = useState<IUser>(null)

    useEffect(() => {
        if (show) {
            roomService.getById(booking.roomId).then(({data}) => setRoom(data))
            userService.getById(booking.userId).then(({data}) => setUser(data))
        }
    }, [show, booking]);

    useEffect(() => {
        if (room) {
            hotelService.getById(room.hotelId).then(({data}) => setHotel(data))
        }
    }, [room]);

    useEffect(() => {
        if (hotel) {
            countryService.getById(hotel.countryId).then(({data}) => setCountry(data))
        }
    }, [hotel]);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Details of booking</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {country && hotel && room && user &&
                        <>
                            <p>ID: {booking.id}</p>
                            <p>State: {booking.state}</p>
                            <p>Country: {country.name}</p>
                            <p>Hotel: {hotel.name}</p>
                            <p>Room: {room.roomNumber}</p>
                            <p>User: {user.username}</p>
                            <p>Booked Since: {booking.bookedSince.toString()}</p>
                            <p>Booked To: {booking.bookedTo.toString()}</p>
                            <p>Price: {booking.price}&#8372;</p>
                        </>
                    }
                </Modal.Body>
        </Modal>
    );
};

export {
    BookingDetailsModal
}