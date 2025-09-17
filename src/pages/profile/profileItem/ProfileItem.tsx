import React, {useEffect, useState} from 'react';
import * as S from './ProfileItem.style';
import {Dialog, DialogContent, DialogTitle, IconButton, Pagination, Stack} from "@mui/material";
import {observer} from "mobx-react-lite";
import PostStore from "../../../store/postStore";
import ModalAddPost from "../../../components/modalAddPost/ModalAddPost";
import {Post} from "../../../types/postType";
import EditPost from "./editPost/EditPost";
import UserStore from "../../../store/userStore";
import Skeleton from "@mui/material/Skeleton";

const ProfileItem = observer(() => {
    const [modalAddPost, setModalAddPost] = React.useState(false);
    const [isEditPost, setIsEditPost] = React.useState(false);
    const [editedPost, setEditedPost] = React.useState<Post>();
    const [postId, setPostId] = React.useState<number | null>(null);
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(4);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const [morePostByEdit, setMorePostByEdit] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await PostStore.getPosts(page, pageSize);

                const userId = UserStore.user.id;
                const userPosts = PostStore.posts.filter(post => post.user_id === userId);

                setPosts(userPosts);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [refresh || pageSize]);

    const editPost = (post: Post, event: React.MouseEvent) => {
        event.preventDefault();
        setMorePostByEdit(false);
        setIsEditPost(true);
        setEditedPost({...post});
        setPostId(post.id);
        setRefresh(prev => prev + 1);
    }

    const deletePost = async (e: React.MouseEvent, id: number | null) => {
        try {
            setLoading(true);
            e.preventDefault();
            await PostStore.deletePostById(id)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefresh(refresh + 1);
        }
    }

    const nextPost = () => {
        setPageSize(pageSize + 5);
        PostStore.getPosts(page, pageSize);
    }

    if (loading) {
        return <S.ProfileItem>
            <S.SkeletonPhoto animation='wave' variant='rounded' height={250} width={350}/>
            <Skeleton animation='wave' variant='rounded' width='39vw'/>
        </S.ProfileItem>
    }
    if (posts.length === 0) {
        return (<S.ProfileItem>
            <S.ProfileItemTitle>Добавьте ваш первый пост!</S.ProfileItemTitle>
            <ModalAddPost setModalAddPost={setModalAddPost} setRefresh={setRefresh} setLoading={setLoading}/>
        </S.ProfileItem>)
    }
    return (
        <S.ProfileItem>
            <ModalAddPost setModalAddPost={setModalAddPost} setRefresh={setRefresh} setLoading={setLoading}/>
            <S.Underline/>
            <S.ProfileItemTitle>Ваши посты</S.ProfileItemTitle>
            {posts.map(post => (
                    <S.ProfileItemPostContainer key={post.id}>
                        {!isEditPost ? (
                            <>
                                <S.ProfileItemPhoto
                                    src={post?.photo}
                                />
                                <S.ProfileItemText>{post.description}</S.ProfileItemText>
                                <S.ProfileItemBtnContainer>
                                    <S.Icon onClick={(e) => editPost(post, e)}>
                                        <S.Edit/>
                                    </S.Icon>
                                    <IconButton onClick={(e) => deletePost(e, post?.id)}>
                                        <S.Delete/>
                                    </IconButton>
                                </S.ProfileItemBtnContainer>
                            </>
                        ) : (
                            postId === post.id ? (
                                <EditPost
                                    key={post.id}
                                    editedPost={editedPost}
                                    setEditedPost={setEditedPost}
                                    setIsEditPost={setIsEditPost}
                                    setRefresh={setRefresh}
                                    setMorePost={setMorePostByEdit}
                                />
                            ) : null
                        )}
                    </S.ProfileItemPostContainer>
                )
            )}
            {morePostByEdit ? (
                <S.ProfileItemButton onClick={() => nextPost()}>
                    Загрузить еще
                </S.ProfileItemButton>
            ) : null}
        </S.ProfileItem>
    );
})

export default ProfileItem;