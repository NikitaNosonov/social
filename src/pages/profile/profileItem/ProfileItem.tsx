import React from 'react';
import * as S from './ProfileItem.style';
import photo from '../../../Снимок экрана 2025-05-30 в 20.57.52.png'
import {Button} from "@mui/material";
import * as R from "../../../routes/routes";
import {useNavigate} from "react-router-dom";

const ProfileItem = () => {
    const navigate = useNavigate();

    return (
        <S.ProfileItem>
            <S.ProfileItemButton>Добавить пост</S.ProfileItemButton>
            <S.Underline/>
            <S.ProfileItemTitle>Ваши посты</S.ProfileItemTitle>
            <S.ProfileItemPostContainer>
                <S.ProfileItemPhoto src={photo}/>
                <S.ProfileItemText>10 тяжелых фильмов, которые многие предпочитают не пересматривать.

                    Они оставляют глубокий след и вызывают сильные эмоции, трудно забываются и требуют
                    особой эмоциональной подготовки.</S.ProfileItemText>
                <S.ProfileItemBtnContainer>
                    <Button variant="contained" color="primary" type="submit" size="small">Редактировать</Button>
                    <Button variant="contained" color="primary" type="submit" size="small" onClick={() => navigate(`/${R.commentRoute}`)}>Прокомментировать</Button>
                    <Button variant="contained" color="error" type="submit" size="small">Удалить</Button>
                </S.ProfileItemBtnContainer>
            </S.ProfileItemPostContainer>
        </S.ProfileItem>
    );
};

export default ProfileItem;