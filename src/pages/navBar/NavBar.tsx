import React from 'react';
import * as S from './NavBar.style'
import * as R from '../../routes/Routes'

const NavBar = () => {
    return (
        <S.Nav>
            <S.NavLink to={R.mainRoute}>Новости</S.NavLink>
            <S.NavLink to={R.profileRoute}>Профиль</S.NavLink>
        </S.Nav>
    );
};

export default NavBar;