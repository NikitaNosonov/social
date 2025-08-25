import React from 'react';
import * as S from './CommentPage.style'
import PostStore from "../../../store/postStore";
import {useLocation} from "react-router-dom";
import CommentStore from "../../../store/commentStore";
import {observer} from "mobx-react-lite";
import {Comment} from "../../../types/commentType";
import CommentService from "../../../services/commentService";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CommentItem from "./commentItem/CommentItem";

const CommentPage = observer(() => {
    const postIdString = localStorage.getItem('postId');
    const postId = postIdString ? parseInt(postIdString) : null;
    const userId = parseInt(localStorage.getItem('userId') || '0');
    const [comment, setComment] = React.useState<Comment>({
        id: Date.now(),
        text: "",
        post_id: postId,
        user_id: userId
    });

    const getData = () => {
        setComment({id: Date.now(), text: "", post_id: postId, user_id: userId})
        PostStore.getPostById(postId).then(() => CommentStore.getComments(postId || null))
    }

    React.useEffect(() => {
        getData()
    }, []);

    return ((!PostStore.postById || UserStore.user === null) ?
            <Spinner/> :
            <S.CommentPage>
                <S.ContentContainer>
                    <S.ContentPhoto src={PostStore.postById?.photo}/>
                    <S.ContentText>{PostStore.postById?.description}</S.ContentText>
                </S.ContentContainer>
                <S.CommentContainer>
                    <CommentItem/>
                </S.CommentContainer>
                <S.InputContainer>
                    <S.InputComment value={comment.text}
                                    type="text"
                                    placeholder="Напишите комментарий"
                                    onChange={e => setComment({...comment, text: e.target.value})}/>
                    <S.ButtonComment variant="contained"
                                     color="success"
                                     size="small"
                                     onClick={() => CommentStore.addComments(comment).then(() => getData())}>Оставить
                        комментарий</S.ButtonComment>
                </S.InputContainer>
            </S.CommentPage>
    );
});

export default CommentPage;