import {Button} from "react-bootstrap";
import {FC, useState} from "react";

import {ICountry} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryForm} from "../../CountryForm";
import {DeleteModal} from "../../DeleteModal";

interface IProp {
    country: ICountry
}

const CountryRow: FC<IProp> = ({country}) => {
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)

    const update = (updatedCountry: ICountry) => {
        dispatch(countryActions.update({countryId: country.id, country: updatedCountry}))
    }

    const deleteCountry = () => {
        dispatch(countryActions.deleteCountry({countryId: country.id}))
    }

    return (
        <>
            <tr>
                <th>{country.id}</th>
                <th>{country.name}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="primary" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                </th>
            </tr>
            <CountryForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} country={country}/>
            <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={country.name}
                         deleteAction={deleteCountry}/>
        </>
    );
};

export {
    CountryRow
}