import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryBadge} from "../CountryBadge";

const CountriesBadgesList = () => {
    const {countries} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAllEnabled())
    }, [dispatch])

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {countries.length > 0 && <CountryBadge name={'All'} partOfList/>}
            {countries && countries.map(country => <CountryBadge key={country.id} id={country.id}
                                                                 name={country.name} partOfList/>)}
        </div>
    );
};

export {
    CountriesBadgesList
}