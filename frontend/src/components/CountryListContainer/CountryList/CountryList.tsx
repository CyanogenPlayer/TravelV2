import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryBadge} from "../CountryBadge";

const CountryList = () => {
    const {countries} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch])

    return (
        <div>
            <CountryBadge name={'All'}/>
            {countries.map(country => <CountryBadge key={country.id} id={country.id} name={country.name}/>)}
        </div>
    );
};

export {
    CountryList
}