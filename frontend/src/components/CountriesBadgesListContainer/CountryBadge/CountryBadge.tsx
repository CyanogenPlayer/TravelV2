import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button} from "react-bootstrap";

interface IProp {
    id?: string,
    name: string,

    partOfList?: boolean
}

const CountryBadge: FC<IProp> = ({id, name, partOfList}) => {
    const [active, setActive] = useState<boolean>(null)
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();

    const countryId = query.get('countryId');

    const navigateToHotels = () => {
        if (partOfList) {
            if (id) {
                setQuery(prev => {
                    prev.set('countryId', id)
                    return prev
                })
            } else {
                setQuery(prev => {
                    prev.delete('countryId')
                    return prev
                })
            }
        } else {
            navigate(`/hotels?countryId=${id}`)
        }
    }

    useEffect(() => {
        if (countryId === id) {
            setActive(true)
        } else if (countryId !== id) {
            setActive(false)
        }
    }, [countryId, id]);

    return (
        <Button variant="secondary" onClick={navigateToHotels} className="mx-1" active={active}>{name}</Button>
    );
};

export {
    CountryBadge
}