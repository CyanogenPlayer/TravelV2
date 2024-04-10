import {HotelsList} from "../../components/HotelsListContainer";
import {CountryList} from "../../components/CountryListContainer";
import {useSearchParams} from "react-router-dom";

const HotelsPage = () => {
    const [query,  setQuery] = useSearchParams();

    const countryId = query.get('country');

    return (
        <div>
            <CountryList setQuery={setQuery}/>
            <HotelsList countryId={countryId}/>
        </div>
    );
};

export {
    HotelsPage
}