import {HotelsList} from "../../components/HotelsListContainer";
import {CountryList} from "../../components/CountryListContainer";
import {useSearchParams} from "react-router-dom";

const HotelsPage = () => {
    const [query] = useSearchParams();

    const countryId = query.get('country');

    return (
        <div>
            <CountryList/>
            <HotelsList countryId={countryId}/>
        </div>
    );
};

export {
    HotelsPage
}