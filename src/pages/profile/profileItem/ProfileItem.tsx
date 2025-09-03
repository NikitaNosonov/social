import React, {useEffect, useState} from 'react';
import * as S from './ProfileItem.style';
import {Dialog, DialogContent, DialogTitle, IconButton, Pagination, Stack} from "@mui/material";
import {observer} from "mobx-react-lite";
import PostStore from "../../../store/postStore";
import ModalAddPost from "../../../components/modalAddPost/ModalAddPost";
import {Post} from "../../../types/postType";
import EditPost from "./editPost/EditPost";
import Spinner from "../../../components/Spinner";

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

    useEffect(() => {
        console.log('111')
        const fetchPosts = async () => {
            await PostStore.getPosts(page, pageSize);

            const userId = Number(localStorage.getItem("userId"));
            const userPosts = PostStore.posts.filter(post => post.user_id === userId);

            setPosts(userPosts);
        };

        fetchPosts();
    }, [refresh]);


    const editPost = (post: Post, event: React.MouseEvent) => {
        event.preventDefault();
        setIsEditPost(true);
        setEditedPost({...post});
        setPostId(post.id);
        setRefresh(prev => prev + 1);
    }

    const deletePost = (e: React.MouseEvent, id: number | null) => {
        e.preventDefault();
        PostStore.deletePostById(id)
        setRefresh(prev => prev + 1);
    }

    const nextPost = () => {
        setLoading(false)
        setPageSize(pageSize + 5);
        PostStore.getPosts(page, pageSize).then(() => setLoading(true));
    }

    return (
        <S.ProfileItem>
            <div onClick={() => {
                setModalAddPost(false)
            }}>
                <Dialog open={modalAddPost}>
                    <S.ModalAddPost>
                        <DialogContent onClick={(e) => e.stopPropagation()}>
                            <DialogTitle style={{marginTop: -25}} align="center">Добавить пост</DialogTitle>
                            <ModalAddPost setModalAddPost={setModalAddPost} setRefresh={setRefresh}/>
                        </DialogContent>
                    </S.ModalAddPost>
                </Dialog>
            </div>
            <S.ProfileItemButton onClick={() => setModalAddPost(true)}>Добавить пост</S.ProfileItemButton>
            <S.Underline/>
            <S.ProfileItemTitle>Ваши посты</S.ProfileItemTitle>
            {posts.map(post => (<S.ProfileItemPostContainer key={post.id}>
                {!isEditPost ? <> <S.ProfileItemPhoto src={post?.photo}/>
                    <S.ProfileItemText>{post.description}</S.ProfileItemText>
                    <S.ProfileItemBtnContainer>
                        <S.Icon onClick={(e) => editPost(post, e)}>
                            <S.Edit/>
                        </S.Icon>
                        <IconButton onClick={(e) => {
                            deletePost(e, post?.id)
                        }}>
                            <S.Delete/>
                        </IconButton>
                    </S.ProfileItemBtnContainer>
                </> : postId === post.id ?
                    <EditPost key={post.id} editedPost={editedPost} setEditedPost={setEditedPost}
                              setIsEditPost={setIsEditPost} setRefresh={setRefresh}/> : null}
            </S.ProfileItemPostContainer>))}
            {!loading ? <Spinner size={60} color="secondary"/> :
                <S.ProfileItemButton onClick={() => nextPost()}>Загрузить еще</S.ProfileItemButton>}
        </S.ProfileItem>
    );
});

export default ProfileItem;