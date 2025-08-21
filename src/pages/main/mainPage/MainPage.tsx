import React from 'react';
import * as S from './MainPage.style'
import PostItem from "./postItem/PostItem";

const MainPage = () => {
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
};

export default MainPage;