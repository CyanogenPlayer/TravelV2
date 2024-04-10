import {useParams} from "react-router-dom";

import {HotelInfo} from "../../components";

const HotelPage = () => {
    const {hotelId} = useParams<{ hotelId: string }>();

    return (
        <div>
            <HotelInfo hotelId={hotelId}/>
        </div>
    );
};

export {
    HotelPage
}