import React from 'react';
import * as S from './NotFoundPage.style'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <S.NotFoundPage>
            <S.TitleError>404</S.TitleError>
            <S.TextError>Страница не найдена:(</S.TextError>
            <Button variant='contained' color="warning" size="large" style={{width: '20vw', alignSelf: 'center'}} onClick={() => navigate('/login')}>На главную страницу</Button>
        </S.NotFoundPage>
    );
};

export default NotFoundPage;