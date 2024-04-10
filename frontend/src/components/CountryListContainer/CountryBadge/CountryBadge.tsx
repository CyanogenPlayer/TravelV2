import {FC} from "react";
import {SetURLSearchParams} from "react-router-dom";

interface IProp {
    id?: string,
    name: string,
    setQuery: SetURLSearchParams
}

const CountryBadge: FC<IProp> = ({id, name, setQuery}) => {
    const toAllHotels = () => {
        setQuery(prev => {
            prev.delete('country');
            return prev;
        })
    }

    const toHotelsByCountry = (id: string) => {
        setQuery(prev => {
            prev.set('country', `${id}`);
            return prev;
        })
    }

    const navigateToHotels = () => {
        if (id) {
            toHotelsByCountry(id)
        }
        else {
            toAllHotels()
        }
    }

    return (
        <div>
            <button onClick={navigateToHotels}>{name}</button>
        </div>
    );
};

export {
    CountryBadge
}