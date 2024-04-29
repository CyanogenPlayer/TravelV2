import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsTable} from "../../HotelsTableContainer";
import {IHotel} from "../../../interfaces";
import {HotelForm} from "../../HotelForm";

const HotelsList = () => {
    const {hotelsForManagement, trigger} = useAppSelector(state => state.hotels);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (hotel: IHotel) => {
        dispatch(hotelActions.create({hotel}))
    }

    useEffect(() => {
        dispatch(hotelActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div>
            <h2>Hotels: </h2>
            <HotelsTable hotels={hotelsForManagement}/>
            <Button variant="primary" onClick={handleShowCreateForm}>Add hotel</Button>
            <HotelForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
        </div>
    );
};

export {
    HotelsList
}