import React, {useEffect, useState} from 'react';
import * as S from './NavBar.style'
import * as R from '../../routes/Routes'
import {observer} from "mobx-react-lite";
import {AdditionalFeaturesAdmin, EnableProfileByNav} from "../../guards/roleGuards";

const NavBar = observer(() => {
    return (
        <S.Nav>
           <EnableProfileByNav><S.NavLink to={R.mainRoute}>Новости</S.NavLink></EnableProfileByNav>
            <S.NavLink to={R.profileRoute}>Профиль</S.NavLink>
            <EnableProfileByNav><S.NavLink to={R.messagesRoute}>Сообщения</S.NavLink></EnableProfileByNav>

            <AdditionalFeaturesAdmin>
                <S.NavLinkAdmContainer>
                    <S.NavLink to={R.listUsersRoute}>Список пользователей</S.NavLink>
                </S.NavLinkAdmContainer>
            </AdditionalFeaturesAdmin>
        </S.Nav>
    );
});

export default NavBar;