import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('/api/v2/hotels').then(({data}) => setHotels(data))
    }, [])
    
    return (
        <div>
            <h1>Hotels:</h1>
            {
                hotels.map(hotel => <div key={hotel.id}>
                    <div>id: {hotel.id}</div>
                    <div>name: {hotel.name}</div>
                    <div>countryId: {hotel.countryId}</div>
                </div>)
            }
        </div>
    );
};

export {
    App
}