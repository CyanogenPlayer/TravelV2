import {useNavigate, useSearchParams} from "react-router-dom";

import {CountriesBadgesList, HotelsCardsList, SearchInPeriodForm} from "../../components";
import {IBooking} from "../../interfaces";
import {hotelActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";

const HotelsPage = () => {
    const {hotels} = useAppSelector(state => state.hotels);
    const [query, setQuery] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const countryId = query.get('countryId');
    const bookedSince = query.get('bookedSince');
    const bookedTo = query.get('bookedTo');
    const capacity = query.get('capacity');

    const viewHotelsInPeriod = (booking: IBooking) => {
        const {bookedSince, bookedTo, capacity} = booking;
        setQuery(prev => {
            prev.set('bookedSince', bookedSince.toISOString())
            prev.set('bookedTo', bookedTo.toISOString())
            prev.delete('capacity')
            return prev;
        })
        if (capacity !== "") {
            setQuery(prev => {
                prev.set('capacity', capacity)
                return prev;
            })
        }
    }

    const resetHotels = () => {
        if (countryId != null) {
            setQuery(prev => {
                prev.delete('bookedSince')
                prev.delete('bookedTo')
                prev.delete('capacity')
                return prev;
            })
        } else {
            navigate("/hotels")
        }
    }

    useEffect(() => {
        dispatch(hotelActions.getHotelsWithAvailableRooms({countryId, bookedSince, bookedTo, capacity}))
    }, [dispatch, countryId, bookedSince, bookedTo, capacity]);

    return (
        <div>
            <CountriesBadgesList/>
            <SearchInPeriodForm viewObjects={viewHotelsInPeriod} resetObjects={resetHotels}/>
            <HotelsCardsList hotels={hotels}/>
        </div>
    );
};

export {
    HotelsPage
}