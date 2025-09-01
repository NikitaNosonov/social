import {createBrowserRouter, Navigate} from "react-router-dom";
import NavBarLayout from "../components/navBar/NavBarLayout";
import MainPage from "../pages/main/mainPage/MainPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CommentPage from "../pages/comments/commentPage/CommentPage";
import LoginPage from "../pages/login/loginPage/LoginPage";
import RegisterPage from "../pages/login/registerPage/RegisterPage";
import ListUsersPage from "../pages/listUsers/listUsersPage/ListUsersPage";
import RoleGuards from "../guards/roleGuards";
import AuthGuards from "../guards/authGuards";

export const mainRoute = '/feed';
export const profileRoute = '/profile';
export const commentRoute = 'comment';
export const loginRoute = '/login';
export const registerRoute = '/register';
export const listUsersRoute = '/users';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={loginRoute} replace/>,
    },
    {
        path: loginRoute,
        element: <LoginPage/>
    },
    {
        path: registerRoute,
        element: <RegisterPage/>
    },
    {
        element: <NavBarLayout/>,
        children: [
            {
                path: mainRoute,
                element: <AuthGuards><MainPage/></AuthGuards>
            },
            {
                path: profileRoute,
                element: <AuthGuards><ProfilePage/></AuthGuards>
            },
            {
                path: commentRoute,
                element: <AuthGuards><CommentPage/></AuthGuards>
            },
            {
                path: listUsersRoute,
                element: <RoleGuards><ListUsersPage/></RoleGuards>
            }
        ],
    },
]);
