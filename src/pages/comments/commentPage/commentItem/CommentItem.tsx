import React from 'react';
import CommentStore from "../../../../store/commentStore";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import * as S from "./CommentItem.style";
import UserStore from "../../../../store/userStore";

const CommentItem = () => {
    return (
        <>
            {CommentStore.comments.map((comment) => (
                <TableContainer>
                    <Table>
                        {(comment.user_id === UserStore.user?.id) ?
                            <TableBody>
                                <TableRow>
                                    <S.TableCell1 rowSpan={2}>
                                        <S.AvatarComment src={UserStore.user?.avatar}/>
                                    </S.TableCell1>
                                    <TableCell>
                                        <S.NameProfile>{UserStore.user?.name} {UserStore.user?.surname}</S.NameProfile>
                                        <S.Comment key={comment.id}>{comment.text}</S.Comment>
                                    </TableCell>
                                </TableRow>

                            </TableBody> : null}
                    </Table>
                </TableContainer>
            ))}
        </>
    );
};

export default CommentItem;