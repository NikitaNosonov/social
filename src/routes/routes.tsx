import {createBrowserRouter} from "react-router-dom";
import NavBarLayout from "../pages/navBar/NavBarLayout";
import MainPage from "../pages/main/mainPage/MainPage";
import ProfilePage from "../pages/profile/ProfilePage";

export const mainRoute = 'feed';
export const profileRoute = 'profile';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBarLayout/>,
        children: [{
            path: mainRoute,
            element: <MainPage/>
        },
            {
                path: profileRoute,
                element: <ProfilePage/>
            }
        ],
    },
]);
