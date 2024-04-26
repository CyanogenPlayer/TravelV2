import {Button} from "react-bootstrap";
import {FC, useState} from "react";

import {ICountry} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryForm} from "../../CountryForm";

interface IProp {
    country: ICountry
}

const CountryRow: FC<IProp> = ({country}) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)

    const update = (updatedCountry: ICountry) => {
        dispatch(countryActions.update({countryId: country.id, country: updatedCountry}))
    }

    return (
        <tr>
            <th>{country.id}</th>
            <th>{country.name}</th>
            <th>
                <Button variant="primary" onClick={handleShowUpdateForm}>Update</Button>
                /ViewHotels/Delete
            </th>
            <CountryForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} country={country}/>
        </tr>
    );
};

export {
    CountryRow
}