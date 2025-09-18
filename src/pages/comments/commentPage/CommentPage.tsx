import React, {useEffect, useState} from 'react';
import * as S from './CommentPage.style'
import PostStore from "../../../store/postStore";
import SendIcon from '@mui/icons-material/Send';
import {observer} from "mobx-react-lite";
import {Comment} from "../../../types/commentType";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import CommentItem from "./commentItem/CommentItem";
import CommentStore from "../../../store/commentStore";
import Skeleton from "@mui/material/Skeleton";

const CommentPage = observer(() => {
    const postId = Number(localStorage.getItem('postId'));
    const userId = Number(sessionStorage.getItem('userId'));
    const [refreshComments, setRefreshComments] = useState(0);

    const [comment, setComment] = useState<Comment>({
        id: Date.now(),
        text: "",
        post_id: postId,
        user_id: userId
    });

    useEffect(() => {
        PostStore.getPostById(postId)
        console.log(userId);
    }, [postId]);

    const addComment = async () => {
        await CommentStore.setComments(comment)
        setComment({id: Date.now(), text: "", post_id: postId, user_id: userId})
        setRefreshComments(prev => prev + 1);
    }

    return (
        <S.CommentPage>
            {(!PostStore.postById || UserStore.user === null) ?
                <S.ContentContainer>
                    <Skeleton animation='wave' variant='rounded' width={320} height={270}/>
                    <S.ContentTextBySkeleton>
                        <Skeleton animation='wave' variant='rounded' width={330} height={20}/>
                        <Skeleton animation='wave' variant='rounded'/>
                        <Skeleton animation='wave' variant='rounded'/>
                    </S.ContentTextBySkeleton>
                </S.ContentContainer> :
                <S.ContentContainer>
                    <S.ContentPhoto src={PostStore.postById?.photo}/>
                    <S.ContentText>{PostStore.postById?.description}</S.ContentText>
                </S.ContentContainer>}
            <S.CommentContainer>
                <CommentItem postId={postId} refreshComments={refreshComments} setRefreshComments={setRefreshComments}/>
            </S.CommentContainer>
            <S.InputContainer>
                <S.InputComment value={comment.text}
                                type="text"
                                placeholder="Напишите комментарий"
                                onChange={e => setComment({...comment, text: e.target.value})}/>
                <S.BtnSendContainer>
                    <SendIcon onClick={() => addComment()}/>
                </S.BtnSendContainer>
            </S.InputContainer>
        </S.CommentPage>
    );
});

export default CommentPage;