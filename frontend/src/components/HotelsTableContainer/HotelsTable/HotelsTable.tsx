import {Table} from "react-bootstrap";
import {FC} from "react";

import {HotelRow} from "../HotelRow";
import {IHotel} from "../../../interfaces";

interface IProp {
    hotels: IHotel[]
}

const HotelsTable: FC<IProp> = ({hotels}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Actions</th>
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