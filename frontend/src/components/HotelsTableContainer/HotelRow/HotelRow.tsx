import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IHotel} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelForm} from "../../HotelForm";
import {DeleteModal} from "../../DeleteModal";
import {HotelPhotoModal} from "../../HotelPhotoModal";

interface IProp {
    hotel: IHotel
}

const HotelRow: FC<IProp> = ({hotel}) => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const [countryName, setCountryName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowPhotoModal = () => setShowPhotoModal(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)

    const update = (updatedHotel: IHotel) => {
        dispatch(hotelActions.update({hotelId: hotel.id, hotel: updatedHotel}))
    }

    const deleteHotel = () => {
        dispatch(hotelActions.deleteHotel({hotelId: hotel.id}))
    }

    const addPhotos = (photos: FormData) => {
        dispatch(hotelActions.addPhotos({hotelId: hotel.id, photos}))
    }

    const deletePhoto = (photoUrl: string) => {
        dispatch(hotelActions.deletePhoto({hotelId: hotel.id, photoUrl}))
    }

    useEffect(() => {
        if (countriesForManagement.length > 0) {
            const country = countriesForManagement.find(country => country.id === hotel.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countriesForManagement, hotel.countryId]);

    return (
        <>
            <tr>
                <th>{hotel.id}</th>
                <th>{hotel.name}</th>
                <th>{countryName ? countryName : 'Country not found'}</th>
                <th>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="success" className="me-1" onClick={handleShowPhotoModal}>Edit Photos</Button>
                    <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <HotelForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} hotel={hotel}/>
            <HotelPhotoModal show={showPhotoModal} setShow={setShowPhotoModal} objName={hotel.name}
                             photosUrls={hotel.photosUrls} addAction={addPhotos} deleteAction={deletePhoto}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={hotel.name}
                         deleteAction={deleteHotel}/>
        </>
    );
};

export {
    HotelRow
}