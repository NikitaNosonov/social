import React, {useEffect, useState} from 'react';
import * as S from './MainPage.style'
import PostItem from "./postItem/PostItem";
import UserStore from "../../../store/userStore";
import {observer} from "mobx-react-lite";
import {Post} from "../../../types/postType";
import PostStore from "../../../store/postStore";

const MainPage = observer(() => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        UserStore.getUserById().then(() => console.log(UserStore.user?.id))
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {
                try {
                    if (search) {
                        PostStore.searchPosts(search).then(() => setPosts(PostStore.posts));
                    } else {
                        PostStore.getPosts().then(() => setPosts(PostStore.posts));
                    }
                } catch (error) {
                    console.error('Ошибка поиска', error);
                }
            }
        )
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <S.MainPage>
            <S.SearchContainer>
                <S.SearchInput
                    type='text'
                    placeholder='Поиск постов'
                    value={search ? search : ''}
                    onChange={(e) => setSearch(e.target.value)}/>
            </S.SearchContainer>
            <S.PostsContainer>
                <PostItem posts={posts}/>
            </S.PostsContainer>
        </S.MainPage>
    );
});

export default MainPage;