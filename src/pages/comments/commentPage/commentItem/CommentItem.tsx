import React, {useEffect} from 'react';
import CommentStore from "../../../../store/commentStore";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import * as S from "./CommentItem.style";
import UserStore from "../../../../store/userStore";
import {AdditionalFeaturesModerator} from "../../../../guards/roleGuards";
import {Comment} from "../../../../types/commentType"

const CommentItem = () => {
    const postId = Number(localStorage.getItem('postId'));
    const [comments, setComments] = React.useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            await CommentStore.getComments(postId)
                .then(() => {
                    console.log(CommentStore.comments)
                    setComments(CommentStore.comments)
                    comments.map((comment) => findUserByCommentId(comment.user_id))
                })
        }
        fetchComments()
    }, [])

    const findUserByCommentId = (userId: number | null) => {
        return UserStore.allUsers.find(user => user.id === userId);
    }

    return (
        <>
            {comments.map((comment) => {
                const user = findUserByCommentId(comment.user_id);
                return (
                    <TableContainer key={comment.id}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <S.TableCell1 rowSpan={2}>
                                        <S.AvatarComment src={user?.avatar}/>
                                    </S.TableCell1>
                                    <TableCell>
                                        <S.NameProfile>{user?.name} {user?.surname}</S.NameProfile>
                                        <S.Comment>{comment.text}</S.Comment>
                                    </TableCell>
                                    <AdditionalFeaturesModerator>
                                        <S.TableCell2>
                                            <IconButton>
                                                <S.DeleteButton onClick={async (e) => {
                                                    e.preventDefault();
                                                    await CommentStore.deleteComment(comment.id || null);
                                                    await CommentStore.getComments(postId);
                                                }}/>
                                            </IconButton>
                                        </S.TableCell2>
                                    </AdditionalFeaturesModerator>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            })}
        </>
    );
};

export default CommentItem;