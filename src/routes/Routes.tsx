import {createBrowserRouter} from "react-router-dom";
import NavBarLayout from "../pages/navBar/NavBarLayout";
import MainPage from "../pages/main/mainPage/MainPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CommentPage from "../pages/comments/commentPage/CommentPage";
import LoginPage from "../pages/login/loginPage/LoginPage";

export const mainRoute = '/feed';
export const profileRoute = '/profile';
export const commentRoute = 'comment';
export const loginRoute = '/login';

export const router = createBrowserRouter([
    {
        path: loginRoute,
        element: <LoginPage/>
    },
    {
        path: '/',
        element: <NavBarLayout/>,
        children: [
            {
                path: mainRoute,
                element: <MainPage/>
            },
            {
                path: profileRoute,
                element: <ProfilePage/>
            },
            {
                path: commentRoute,
                element: <CommentPage/>
            }
        ],
    },
]);
