import {FC} from "react";

import {IHotel} from "../../../interfaces";

interface IProp {
    hotel: IHotel
}

const HotelsListCard: FC<IProp> = ({hotel}) => {
    const {id, name, countryId} = hotel;

    return (
        <div>
            <div>id: {id}</div>
            <div>name: {name}</div>
            <div>countryId: {countryId}</div>
        </div>
    );
};

export {
    HotelsListCard
}