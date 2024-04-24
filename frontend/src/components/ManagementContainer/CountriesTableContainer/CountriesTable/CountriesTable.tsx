import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {countryActions} from "../../../../redux";
import {CountryRow} from "../CountryRow";

const CountriesTable = () => {
    const {countries} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Countries:</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {countries && countries.map(country => <CountryRow key={country.id} country={country}/>)}
                </tbody>
            </Table>
            <h6>add country</h6>
        </div>
    );
};

export {
    CountriesTable
}