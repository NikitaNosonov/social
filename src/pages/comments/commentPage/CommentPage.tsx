import React from 'react';
import * as S from './CommentPage.style'
import PostStore from "../../../store/postStore";
import SendIcon from '@mui/icons-material/Send';
import {observer} from "mobx-react-lite";
import {Comment} from "../../../types/commentType";
import UserStore from "../../../store/userStore";
import Spinner from "../../../components/Spinner";
import CommentItem from "./commentItem/CommentItem";
import CommentStore from "../../../store/commentStore";

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
        PostStore.getPostById(postId)
            .then(() => CommentStore.getComments(postId || null))
            .then(() => CommentStore.comments)
    }

    React.useEffect(() => {
        getData();
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
                    <S.BtnSendContainer>
                        <SendIcon onClick={() => CommentStore.setComments(comment).then(() => getData())}/>
                    </S.BtnSendContainer>
                </S.InputContainer>
            </S.CommentPage>
    )
        ;
});

export default CommentPage;