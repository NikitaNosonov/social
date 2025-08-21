import React from 'react';
import * as S from './ProfileInfo.style'
import photo from '../../../Снимок экрана 2025-05-30 в 20.57.52.png'
import {Button} from "@mui/material";

const ProfileInfo = () => {
    return (
        <S.ProfileInfo>
            <S.ProfilePhoto src={photo}/>
            <S.ProfileName>Никита Носонов</S.ProfileName>
            <S.ProfileNameText>Воронеж</S.ProfileNameText>
            <S.ProfileNameText>21 год</S.ProfileNameText>
            <S.ProfileButtonContainer>
                <Button variant="contained" color="primary" type="submit" size="small">Редактировать</Button>
                <Button variant="contained" color="error" type="submit" size="small">Выйти</Button>
            </S.ProfileButtonContainer>
        </S.ProfileInfo>
    );
};

export default ProfileInfo;