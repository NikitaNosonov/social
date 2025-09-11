import {createBrowserRouter, Navigate} from "react-router-dom";
import NavBarLayout from "../components/navBar/NavBarLayout";
import MainPage from "../pages/main/mainPage/MainPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CommentPage from "../pages/comments/commentPage/CommentPage";
import LoginPage from "../pages/login/loginPage/LoginPage";
import RegisterPage from "../pages/login/registerPage/RegisterPage";
import ListUsersPage from "../pages/listUsers/listUsersPage/ListUsersPage";
import {RouteGuards, RoleGuards, EnableGuards} from "../guards/routeGuards";
import MessagesPage from "../pages/messages/messagesPage/MessagesPage";

export const mainRoute = '/feed';
export const profileRoute = '/profile';
export const commentRoute = 'comment';
export const loginRoute = '/login';
export const registerRoute = '/register';
export const listUsersRoute = '/users';
export const messagesRoute = '/messages';

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
                element: <RouteGuards><EnableGuards><MainPage/></EnableGuards></RouteGuards>
            },
            {
                path: profileRoute,
                element: <RouteGuards><ProfilePage/></RouteGuards>
            },
            {
                path: commentRoute,
                element: <RouteGuards><EnableGuards><CommentPage/></EnableGuards></RouteGuards>
            },
            {
                path: listUsersRoute,
                element: <RouteGuards><RoleGuards><ListUsersPage/></RoleGuards></RouteGuards>
            },
            {
                path: messagesRoute,
                element: <MessagesPage/>
            }
        ],
    },
]);
