import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {HotelsPage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'hotels'}/>},
            {path: 'hotels', element: <HotelsPage/>},
        ]
    }
])

export {
    router
}