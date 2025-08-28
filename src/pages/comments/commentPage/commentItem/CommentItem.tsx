import React, {useEffect} from 'react';
import CommentStore from "../../../../store/commentStore";
import {Button, IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import * as S from "./CommentItem.style";
import UserStore from "../../../../store/userStore";
import {Comment} from "../../../../types/commentType"
import DeleteIcon from "@mui/icons-material/Delete";

const CommentItem = () => {
    useEffect(() => {
        CommentStore.getComments
    }, [])

    const findUserByCommentId = (userId: number | null) => {
        return UserStore.allUsers.find(user => user.id === userId);
    }

    return (
        <>
            {CommentStore.comments.map((comment) => {
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
                                    <S.TableCell2>
                                        <IconButton>
                                            <S.DeleteButton onClick={(e) => {
                                                e.preventDefault();
                                                CommentStore.deleteComment(comment.id || null)
                                            }}/>
                                        </IconButton>
                                    </S.TableCell2>
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