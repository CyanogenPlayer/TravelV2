import {Table} from "react-bootstrap";
import {FC} from "react";

import {CountryRow} from "../CountryRow";
import {ICountry} from "../../../interfaces";

interface IProp {
    countries: ICountry[]
}

const CountriesTable: FC<IProp> = ({countries}) => {
    return (
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
    );
};

export {
    CountriesTable
}