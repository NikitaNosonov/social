import React from 'react';
import {Navigate} from "react-router-dom";
import * as R from "../routes/Routes"

interface roleGuardProps {
    children: React.ReactNode;
}

const RoleGuards: React.FC<roleGuardProps> = ({children}) => {
    const role = localStorage.getItem('userRole')
    console.log(role)
    if (role !== 'admin') {
        alert('У вас нет доступа к этой странице!')
        return <Navigate to={R.loginRoute} replace/> ;
    }
    return <>{children}</>;
};

export default RoleGuards;