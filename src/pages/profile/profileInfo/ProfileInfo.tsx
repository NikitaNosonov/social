import React, {useEffect, useState} from 'react';
import * as S from './ProfileInfo.style'
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import {observer} from "mobx-react-lite";
import EditProfile from "./modalEditProfile/EditProfile";

const ProfileInfo = observer(() => {
    useEffect(() => {
        UserStore.getUserById(1)
    })

    const [isEditProfile, setIsEditProfile] = useState(false);

    return (
        !UserStore.user ? (
            <Spinner size={60} color="secondary"/>
        ) : isEditProfile ? (
            <EditProfile setIsEditProfile={setIsEditProfile}/>
        ) : (
            <S.ProfileInfo>
                <S.ProfilePhoto src={UserStore.user.avatar}/>
                <S.ProfileName>{UserStore.user.name} {UserStore.user.surname}</S.ProfileName>
                <S.ProfileNameText>{UserStore.user.city}</S.ProfileNameText>
                <S.ProfileNameText>{UserStore.user.age} год</S.ProfileNameText>
                <S.ProfileButtonContainer>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                        onClick={() => setIsEditProfile(true)}
                    >Редактировать</Button>
                    <Button variant="contained" color="error" type="submit" size="small">Выйти</Button>
                </S.ProfileButtonContainer>
            </S.ProfileInfo>
        )
    );
});

export default ProfileInfo;