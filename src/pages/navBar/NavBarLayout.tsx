import React from 'react';
import NavBar from "./NavBar";
import { Outlet } from 'react-router-dom';

const NavBarLayout: React.FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default NavBarLayout;