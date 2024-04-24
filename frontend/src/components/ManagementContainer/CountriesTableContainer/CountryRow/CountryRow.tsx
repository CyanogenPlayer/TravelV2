import {FC} from "react";

import {ICountry} from "../../../../interfaces";

interface IProp {
    country: ICountry
}

const CountryRow: FC<IProp> = ({country}) => {
    return (
        <tr>
            <th>{country.id}</th>
            <th>{country.name}</th>
            <th>ViewHotels/Update/Delete</th>
        </tr>
    );
};

export {
    CountryRow
}