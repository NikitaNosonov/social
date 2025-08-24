import React from 'react';
import * as S from './CommentPage.style'

const CommentPage = () => {
    return (
        <S.CommentPage>
            <S.ContentContainer>
                {/*<S.ContentPhoto src={photo}/>*/}
                <S.ContentText>10 тяжелых фильмов, которые многие предпочитают не пересматривать.

                    Они оставляют глубокий след и вызывают сильные эмоции, трудно забываются и требуют
                    особой эмоциональной подготовки.</S.ContentText>
            </S.ContentContainer>
            <S.CommentContainer>sdasadasdas</S.CommentContainer>
            <S.InputComment placeholder="Напишите комментарий"/>
        </S.CommentPage>
    );
};

export default CommentPage;