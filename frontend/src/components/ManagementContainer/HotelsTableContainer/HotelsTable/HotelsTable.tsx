import {Table} from "react-bootstrap";
import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {hotelActions} from "../../../../redux";
import {HotelRow} from "../HotelRow";

const HotelsTable = () => {
    const {hotels} = useAppSelector(state => state.hotels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hotelActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Hotels: </h2>
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
            <h6>add hotel</h6>
        </div>
    );
};

export {
    HotelsTable
}