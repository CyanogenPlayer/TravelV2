import {Table} from "react-bootstrap";
import {FC} from "react";

import {HotelRow} from "../HotelRow";
import {IHotel} from "../../../interfaces";

interface IProp {
    hotels: IHotel[]
}

const HotelsTable: FC<IProp> = ({hotels}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>country</th>
                <th>actions</th>
            </tr>
            </thead>
            <tbody>
            {hotels && hotels.map(hotel => <HotelRow key={hotel.id} hotel={hotel}/>)}
            </tbody>
        </Table>
    );
};

export {
    HotelsTable
}