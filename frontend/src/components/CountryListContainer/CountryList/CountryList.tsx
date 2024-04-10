import {FC, useEffect} from "react";
import {SetURLSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryBadge} from "../CountryBadge";

interface IProp {
    setQuery: SetURLSearchParams
}

const CountryList: FC<IProp> = ({setQuery}) => {
    const {countries} = useAppSelector(state => state.countries);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch])

    return (
        <div>
            <CountryBadge name={'All'} setQuery={setQuery}/>
            {countries.map(country => <CountryBadge key={country.id} id={country.id} name={country.name}
                                                    setQuery={setQuery}/>)}
        </div>
    );
};

export {
    CountryList
}