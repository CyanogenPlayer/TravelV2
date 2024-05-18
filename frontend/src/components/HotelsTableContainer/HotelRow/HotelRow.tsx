import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IHotel, IRoom} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelForm} from "../../HotelForm";
import {DeleteModal} from "../../DeleteModal";
import {HotelPhotoModal} from "../../HotelPhotoModal";
import {roomService} from "../../../services";
import {TableModal} from "../../TableModal";
import {RoomsTable} from "../../RoomsTableContainer";

interface IProp {
    hotel: IHotel
}

const HotelRow: FC<IProp> = ({hotel}) => {
    const {countries: {countriesForManagement}, rooms: {trigger}} = useAppSelector(state => state);
    const [countryName, setCountryName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showRoomsModal, setShowRoomsModal] = useState<boolean>(null)
    const [rooms, setRooms] = useState<IRoom[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowPhotoModal = () => setShowPhotoModal(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowRoomsModal = () => setShowRoomsModal(true)

    const update = (updatedHotel: IHotel) => {
        dispatch(hotelActions.update({hotelId: hotel.id, hotel: updatedHotel}))
    }

    const deleteHotel = () => {
        dispatch(hotelActions.deleteHotel({hotelId: hotel.id}))
    }

    const addPhotos = (photos: FormData) => {
        dispatch(hotelActions.addPhotos({hotelId: hotel.id, photos}))
    }

    const deletePhoto = (photoId: string) => {
        dispatch(hotelActions.deletePhoto({hotelId: hotel.id, photoId}))
    }

    useEffect(() => {
        if (countriesForManagement.length) {
            const country = countriesForManagement.find(country => country.id === hotel.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countriesForManagement, hotel.countryId]);

    useEffect(() => {
        if (showRoomsModal) {
            roomService.getByHotelId(hotel.id).then(({data}) => setRooms(data))
        }
    }, [showRoomsModal, trigger, hotel.id]);

    return (
        <>
            <tr>
                <th>{hotel.id}</th>
                <th>{hotel.name}</th>
                <th>{countryName ? countryName : 'Country not found'}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowRoomsModal}>View Rooms</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="success" className="me-1" onClick={handleShowPhotoModal}>Edit Photos</Button>
                    <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <HotelForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} hotel={hotel}/>
            <HotelPhotoModal show={showPhotoModal} setShow={setShowPhotoModal} objName={hotel.name}
                             photosIds={hotel.photosIds} addAction={addPhotos} deleteAction={deletePhoto}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={hotel.name}
                         deleteAction={deleteHotel}/>
            <TableModal show={showRoomsModal} setShow={setShowRoomsModal} title={`Rooms in ${hotel.name}`}>
                <RoomsTable rooms={rooms}/>
            </TableModal>
        </>
    );
};

export {
    HotelRow
}