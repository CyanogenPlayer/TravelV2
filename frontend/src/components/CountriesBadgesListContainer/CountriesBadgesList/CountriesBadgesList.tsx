import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryBadge} from "../CountryBadge";

const CountriesBadgesList = () => {
    const {countries} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch])

    return (
        <div>
            {countries.length > 0 && <CountryBadge name={'All'}/>}
            {countries && countries.map(country => <CountryBadge key={country.id} id={country.id}
                                                                 name={country.name}/>)}
        </div>
    );
};

export {
    CountriesBadgesList
}