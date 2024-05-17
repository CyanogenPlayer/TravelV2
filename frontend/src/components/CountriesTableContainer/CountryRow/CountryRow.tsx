import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {ICountry, IHotel} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryForm} from "../../CountryForm";
import {DeleteModal} from "../../DeleteModal";
import {hotelService} from "../../../services";
import {TableModal} from "../../TableModal";
import {HotelsTable} from "../../HotelsTableContainer";

interface IProp {
    country: ICountry
}

const CountryRow: FC<IProp> = ({country}) => {
    const {trigger} = useAppSelector(state => state.hotels);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showHotelsModal, setShowHotelsModal] = useState<boolean>(null)
    const [hotels, setHotels] = useState<IHotel[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowHotelsModal = () => setShowHotelsModal(true)

    const update = (updatedCountry: ICountry) => {
        dispatch(countryActions.update({countryId: country.id, country: updatedCountry}))
    }

    const deleteCountry = () => {
        dispatch(countryActions.deleteCountry({countryId: country.id}))
    }

    useEffect(() => {
        if (showHotelsModal) {
            hotelService.getByCountryId(country.id).then(({data}) => setHotels(data))
        }
    }, [showHotelsModal, trigger, country.id]);

    return (
        <>
            <tr>
                <th>{country.id}</th>
                <th>{country.name}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowHotelsModal}>View Hotels</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <CountryForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} country={country}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={country.name}
                         deleteAction={deleteCountry}/>
            <TableModal show={showHotelsModal} setShow={setShowHotelsModal} title={`Hotels in ${country.name}`}>
                <HotelsTable hotels={hotels}/>
            </TableModal>
        </>
    );
};

export {
    CountryRow
}