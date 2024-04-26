import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountriesTable} from "../../CountriesTableContainer";
import {ICountry} from "../../../interfaces";
import {CountryForm} from "../../CountryForm";

const CountriesList = () => {
    const {countriesForManagement, trigger} = useAppSelector(state => state.countries);
    const [showCreateForm, setShowCreateForm] = useState(false)
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (country: ICountry) => {
        dispatch(countryActions.create({country}))
    }

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div>
            <h2>Countries:</h2>
            <CountriesTable countries={countriesForManagement}/>
            <Button variant="primary" onClick={handleShowCreateForm}>Create country</Button>
            <CountryForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
        </div>
    );
};

export {
    CountriesList
}