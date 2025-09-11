import React from 'react';
import * as R from '../routes/Routes'
import {Navigate} from "react-router-dom";
import supabase from "../supabaseClient";
import UserStore from "../store/userStore";

interface authGuardsProps {
    children: React.ReactNode;
}

export const RouteGuards: React.FC<authGuardsProps> = ({children}) => {
    const fetchSession = async () => {
        const session = await supabase.auth.getSession();
        if (!session.data.session?.user.id) {
            alert("Авторизируйтесь!")
            return <Navigate to={R.loginRoute} replace/>;
        }
    }
    fetchSession();
    return <>{children}</>;
};

export const RoleGuards: React.FC<authGuardsProps> = ({children}) => {
    const role = UserStore.user.role
    if (role !== 'admin') {
        alert('У вас нет доступа к этой странице!')
        return <Navigate to={R.loginRoute} replace/> ;
    }
    return <>{children}</>;
};

export const EnableGuards: React.FC<authGuardsProps> = ({children}) => {
    const userEnable = UserStore.user.unlocked
    if (!userEnable) {
        alert('У вас нет доступа к этой странице!')
        return <Navigate to={R.loginRoute} replace/> ;
    }
    return <>{children}</>;
}