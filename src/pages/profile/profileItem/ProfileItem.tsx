import React, {useEffect} from 'react';
import * as S from './ProfileItem.style';
import {Button, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import PostStore from "../../../store/postStore";
import ModalAddPost from "../../../components/modalAddPost/ModalAddPost";
import {Post} from "../../../types/postType";
import EditPost from "./editPost/EditPost";

const ProfileItem = observer(() => {
    const navigate = useNavigate();
    const [modalAddPost, setModalAddPost] = React.useState(false);
    const [isEditPost, setIsEditPost] = React.useState(false);
    const [editedPost, setEditedPost] = React.useState<Post>();
    const [postId, setPostId] = React.useState<number | null>(null);
    const [posts, setPosts] = React.useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            await PostStore.getPosts();

            const userId = Number(localStorage.getItem("userId"));
            const userPosts = PostStore.posts.filter(post => post.user_id === userId);

            setPosts(userPosts);
        };

        fetchPosts();
    }, [PostStore.posts.length]);

    const editPost = (post: Post, event: React.MouseEvent) => {
        event.preventDefault();
        setIsEditPost(true);
        setEditedPost({...post});
        setPostId(post.id);
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
                            <ModalAddPost setModalAddPost={setModalAddPost}/>
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
                            e.preventDefault();
                            PostStore.deletePostById(post.id)
                        }}>
                            <S.Delete/>
                        </IconButton>
                    </S.ProfileItemBtnContainer>
                </> : postId === post.id ?
                    <EditPost key={post.id} editedPost={editedPost} setEditedPost={setEditedPost}
                              setIsEditPost={setIsEditPost}/> : null}
            </S.ProfileItemPostContainer>))}
        </S.ProfileItem>
    );
});

export default ProfileItem;