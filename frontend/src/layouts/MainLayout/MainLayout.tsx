import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            TODO add header
            <Outlet/>
        </div>
    );
};

export {
    MainLayout
}