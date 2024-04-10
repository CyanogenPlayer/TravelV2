import {useSearchParams} from "react-router-dom";

import {CountriesList, HotelsList} from "../../components";

const HotelsPage = () => {
    const [query] = useSearchParams();

    const countryId = query.get('country');

    return (
        <div>
            <CountriesList/>
            <HotelsList countryId={countryId}/>
        </div>
    );
};

export {
    HotelsPage
}