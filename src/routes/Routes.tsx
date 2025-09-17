import {createBrowserRouter, Navigate, useNavigate} from "react-router-dom";
import NavBarLayout from "../components/navBar/NavBarLayout";
import MainPage from "../pages/main/mainPage/MainPage";
import ProfilePage from "../pages/profile/ProfilePage";
import CommentPage from "../pages/comments/commentPage/CommentPage";
import LoginPage from "../pages/login/loginPage/LoginPage";
import RegisterPage from "../pages/login/registerPage/RegisterPage";
import ListUsersPage from "../pages/listUsers/listUsersPage/ListUsersPage";
import {RouteGuards, RoleGuards, EnableGuards} from "../guards/routeGuards";
import MessagesPage from "../pages/messages/messagesPage/MessagesPage";
import React, {useEffect} from "react";
import NotFoundPage from "../pages/notFound/NotFoundPage";

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
        path: '*',
        element: <NotFoundPage/>
    },
    {
        element: <RouteGuards><NavBarLayout/></RouteGuards>,
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
