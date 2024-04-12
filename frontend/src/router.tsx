import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AuthPage, HotelPage, HotelsPage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'hotels'}/>},
            {path: 'hotels', element: <HotelsPage/>},
            {path: 'hotels/:hotelId', element: <HotelPage/>},
            {path: 'auth', element: <AuthPage/>}
        ]
    }
])

export {
    router
}