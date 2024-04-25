import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsTable} from "../../HotelsTableContainer";

const HotelsList = () => {
    const {hotelsForManagement} = useAppSelector(state => state.hotels);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(hotelActions.getAll())
    }, [dispatch]);

    return (
        <div>
            <h2>Hotels: </h2>
            <HotelsTable hotels={hotelsForManagement}/>
            <h6>add hotel</h6>
        </div>
    );
};

export {
    HotelsList
}