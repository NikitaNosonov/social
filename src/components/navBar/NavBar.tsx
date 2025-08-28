import React from 'react';
import * as S from './NavBar.style'
import * as R from '../../routes/Routes'
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    return (
        <S.Nav>
            <S.NavLink to={R.mainRoute}>Новости</S.NavLink>
            <S.NavLink to={R.profileRoute}>Профиль</S.NavLink>

            <S.NavLinkAdmContainer><S.NavLinkAdm to={R.listUsersRoute}>Список
                пользователей</S.NavLinkAdm></S.NavLinkAdmContainer>
        </S.Nav>
    );
});

export default NavBar;