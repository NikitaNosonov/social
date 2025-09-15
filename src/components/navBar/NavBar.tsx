import React, {useEffect, useState} from 'react';
import * as S from './NavBar.style'
import * as R from '../../routes/Routes'
import {observer} from "mobx-react-lite";
import {AdditionalFeaturesAdmin, EnableProfileByNav} from "../../guards/roleGuards";

import UserStore from "../../store/userStore";

const NavBar = observer(() => {
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const [unlocked, setUnlocked] = useState<boolean | null>(null)


    useEffect(() => {
        const check = async () => {
            try {
                await UserStore.getUserById()
                const userRole = UserStore.user.role;
                if (userRole)
                    setRole(userRole)
                console.log("userRole", userRole)
                const userEnable = UserStore.user.unlocked
                if (userEnable) {
                    setUnlocked(userEnable)
                }
                console.log("userEnable", userEnable)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }
        check().then(() => console.log('Загрузилось!'))
    }, [])

    if (loading) {
        return null
    } else {
        return (
            <S.Nav>
                <EnableProfileByNav unlocked={unlocked}><S.NavLink
                    to={R.mainRoute}>Новости</S.NavLink></EnableProfileByNav>
                <S.NavLink to={R.profileRoute}>Профиль</S.NavLink>
                <EnableProfileByNav unlocked={unlocked}><S.NavLink
                    to={R.messagesRoute}>Сообщения</S.NavLink></EnableProfileByNav>

                <AdditionalFeaturesAdmin role={role}>
                    <S.NavLinkAdmContainer>
                        <S.NavLink to={R.listUsersRoute}>Список пользователей</S.NavLink>
                    </S.NavLinkAdmContainer>
                </AdditionalFeaturesAdmin>
            </S.Nav>
        );
    }
});

export default NavBar;