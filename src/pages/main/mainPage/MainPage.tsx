import React, {useEffect} from 'react';
import * as S from './MainPage.style'
import PostItem from "./postItem/PostItem";
import UserStore from "../../../store/userStore";
import {observer} from "mobx-react-lite";
import supabase from "../../../supabaseClient";
import {Button} from "@mui/material";

const MainPage = observer(() => {

    const res = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'nikitanosonov93@gmail.com',
            password: '1111',
        });

        if (error) {
            console.error('Login error:', error.message);
            return null;
        }

        return data.user;
    }

    useEffect(() => {
        UserStore.getUserById(1).then(() => console.log(UserStore.user?.id))
        localStorage.setItem('userId', String(UserStore.user?.id))

        res()
    })

    return (
        <S.MainPage>
            <S.SearchContainer>
                <S.SearchInput placeholder='Поиск постов'/>
            </S.SearchContainer>
            <S.PostsContainer>
                <PostItem/>
                <Button onClick={() => res()}></Button>
            </S.PostsContainer>
        </S.MainPage>
    );
});

export default MainPage;