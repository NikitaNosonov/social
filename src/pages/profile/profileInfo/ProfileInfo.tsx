import React, {useEffect} from 'react';
import * as S from './ProfileInfo.style'
import photo from '../../../Снимок экрана 2025-05-30 в 20.57.52.png'
import {Button} from "@mui/material";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";

const ProfileInfo = () => {
    useEffect(()=> {
        UserStore.getUser()
    })

    const user = UserStore.user

    return (
        !user ? (
            <Spinner size={60} color="secondary" />
        ) : (
        <S.ProfileInfo>
            <S.ProfilePhoto src={user.avatar}/>
            <S.ProfileName>{user.name} {user.surname}</S.ProfileName>
            <S.ProfileNameText>{user.city}</S.ProfileNameText>
            <S.ProfileNameText>{user.age} год</S.ProfileNameText>
            <S.ProfileButtonContainer>
                <Button variant="contained" color="primary" type="submit" size="small">Редактировать</Button>
                <Button variant="contained" color="error" type="submit" size="small">Выйти</Button>
            </S.ProfileButtonContainer>
        </S.ProfileInfo>
    ));
};

export default ProfileInfo;