import React, {useEffect, useState} from 'react';
import * as R from '../routes/Routes'
import {Navigate} from "react-router-dom";
import supabase from "../supabaseClient";
import UserStore from "../store/userStore";
import Spinner from "../components/Spinner";

interface authGuardsProps {
    children: React.ReactNode;
}

export const RouteGuards: React.FC<authGuardsProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("userId"));

    useEffect(() => {
        const interval = setInterval(() => {
            const userId = sessionStorage.getItem("userId");
            console.log('Отработало')
            setIsAuthenticated(!!userId);
        }, 3600000);

        return () => clearInterval(interval);
    }, []);

    if (!isAuthenticated) {
        alert("Необходимо пройти авторизацию!");
        return <Navigate to={R.loginRoute} replace/>;
    }

    return <>{children}</>;
    };

export const RoleGuards: React.FC<authGuardsProps> = ({children}) => {
    const role = sessionStorage.getItem("userRole");
    if (role !== 'admin') {
        alert('У вас нет доступа к этой странице!')
        return <Navigate to={R.loginRoute} replace/>;
    }
    return <>{children}</>;
};

export const EnableGuards: React.FC<authGuardsProps> = ({children}) => {
    const userEnable = sessionStorage.getItem("unlockedAccount");
    if (!userEnable) {
        alert('У вас нет доступа к этой странице!')
        return <Navigate to={R.loginRoute} replace/>;
    }
    return <>{children}</>;
}