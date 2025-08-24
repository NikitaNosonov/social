import React, {useEffect} from 'react';
import * as S from './ProfileItem.style';
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import * as R from "../../../routes/Routes";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import PostStore from "../../../store/postStore";
import Spinner from "../../../components/Spinner";
import ModalAddPost from "./modalAddPost/ModalAddPost";
import PostService from "../../../services/postService";

const ProfileItem = observer(() => {
    const navigate = useNavigate();
    const [modalAddPost, setModalAddPost] = React.useState(false);

    useEffect(() => {
        PostStore.getPosts()
    })

    return (
        PostStore.posts.length === 0 ? (
            <Spinner size={60} color="secondary"/>
        ) : (<S.ProfileItem>
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
                {PostStore.posts.map(post => (<S.ProfileItemPostContainer>
                    <S.ProfileItemPhoto src={post.photo}/>
                    <S.ProfileItemText>{post.description}</S.ProfileItemText>
                    <S.ProfileItemBtnContainer>
                        <Button variant="contained"
                                color="primary"
                                type="submit"
                                size="small">Редактировать</Button>
                        <Button variant="contained"
                                color="primary"
                                type="submit"
                                size="small"
                                onClick={() => navigate(`/${R.commentRoute}`)}>Прокомментировать</Button>
                        <Button variant="contained"
                                color="error"
                                type="submit"
                                size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            PostService.deletePost(post.id)
                        }}>Удалить</Button>
                    </S.ProfileItemBtnContainer>
                </S.ProfileItemPostContainer>))}
            </S.ProfileItem>
        )
    );
});

export default ProfileItem;