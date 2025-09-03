import React, {useEffect, useState} from 'react';
import * as S from './MainPage.style'
import PostItem from "./postItem/PostItem";
import UserStore from "../../../store/userStore";
import {observer} from "mobx-react-lite";
import {Post} from "../../../types/postType";
import PostStore from "../../../store/postStore";
import {Button} from "@mui/material";

const MainPage = observer(() => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        UserStore.getUserById().then(() => console.log(UserStore.user?.id))
    }, [])

    useEffect(() => {
        const timer = setTimeout(async () => {
                try {
                    if (search) {
                        PostStore.searchPosts(search).then(() => setPosts(PostStore.posts));
                    } else {
                        PostStore.getPosts(page, pageSize).then(() => setPosts(PostStore.posts));
                    }
                } catch (error) {
                    console.error('Ошибка поиска', error);
                }
            }
        )
        return () => clearTimeout(timer);
    }, [search || pageSize]);

    const nextPosts = () => {
        setLoading(false);
        setPageSize(pageSize + 5);
        PostStore.getPosts(page, pageSize).then(() => setLoading(true));
    }

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
                <PostItem posts={posts} nextPosts={nextPosts} loading={loading}/>
            </S.PostsContainer>
        </S.MainPage>
    );
});

export default MainPage;