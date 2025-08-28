import React, {useEffect} from 'react';
import * as S from './MainPage.style'
import PostItem from "./postItem/PostItem";
import UserStore from "../../../store/userStore";
import {observer} from "mobx-react-lite";

const MainPage = observer(() => {

    useEffect(() => {
        UserStore.getUserById().then(() => console.log(UserStore.user?.id))
    })

    return (
        <S.MainPage>
            <S.SearchContainer>
                <S.SearchInput placeholder='Поиск постов'/>
            </S.SearchContainer>
            <S.PostsContainer>
                <PostItem/>
            </S.PostsContainer>
        </S.MainPage>
    );
});

export default MainPage;