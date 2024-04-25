import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountriesTable} from "../../CountriesTableContainer";

const CountriesList = () => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Countries:</h2>
            <CountriesTable countries={countriesForManagement}/>
            <h6>add country</h6>
        </div>
    );
};

export {
    CountriesList
}