import {useSearchParams} from "react-router-dom";

import {CountriesBadgesList, HotelsCardsList} from "../../components";

const HotelsPage = () => {
    const [query] = useSearchParams();

    const countryId = query.get('country');

    return (
        <div>
            <CountriesBadgesList/>
            <HotelsCardsList countryId={countryId}/>
        </div>
    );
};

export {
    HotelsPage
}