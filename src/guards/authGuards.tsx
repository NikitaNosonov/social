import React from 'react';
import * as R from '../routes/Routes'
import {Navigate} from "react-router-dom";
import supabase from "../supabaseClient";

interface authGuardsProps {
    children: React.ReactNode;
}

const AuthGuards: React.FC<authGuardsProps> = ({children}) => {
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

export default AuthGuards;