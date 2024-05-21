import {Table} from "react-bootstrap";
import {FC} from "react";

import {ICity} from "../../../interfaces";
import {CityRow} from "../CityRow";

interface IProp {
    cities: ICity[]
}

const CitiesTable: FC<IProp> = ({cities}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Enabled</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cities && cities.map(city => <CityRow key={city.id} city={city}/>)}
            </tbody>
        </Table>
    );
};

export {
    CitiesTable
}