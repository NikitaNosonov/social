import React, {useEffect, useState} from 'react';
import * as S from './ProfileInfo.style'
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import {observer} from "mobx-react-lite";
import ModalEditProfile from "./modalEditProfile/ModalEditProfile";

const ProfileInfo = observer(() => {
    useEffect(() => {
        UserStore.getUser()
    })

    const [modalEditProfile, setModalEditProfile] = useState(false);

    return (
        !UserStore.user ? (
            <Spinner size={60} color="secondary"/>
        ) : (
            <S.ProfileInfo>
                <div onClick={() => {
                    setModalEditProfile(false)
                }}>
                    <Dialog open={modalEditProfile}>
                        <S.ModalEditProfile>
                            <DialogContent onClick={(e) => e.stopPropagation()}>
                                <DialogTitle style={{marginTop: -25}} align="center">Редактировать профиль</DialogTitle>
                                <ModalEditProfile setModalEditProfile={setModalEditProfile}/>
                            </DialogContent>
                        </S.ModalEditProfile>
                    </Dialog>
                </div>
                <S.ProfilePhoto src={UserStore.user.avatar}/>
                <S.ProfileName>{UserStore.user.name} {UserStore.user.surname}</S.ProfileName>
                <S.ProfileNameText>{UserStore.user.city}</S.ProfileNameText>
                <S.ProfileNameText>{UserStore.user.age} год</S.ProfileNameText>
                <S.ProfileButtonContainer>
                    <Button variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            onClick={() => setModalEditProfile(true)}>Редактировать</Button>
                    <Button variant="contained" color="error" type="submit" size="small">Выйти</Button>
                </S.ProfileButtonContainer>
            </S.ProfileInfo>
        ));
});

export default ProfileInfo;