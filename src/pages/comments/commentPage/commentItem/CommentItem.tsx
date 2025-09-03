import React, {useEffect, useState} from 'react';
import CommentStore from "../../../../store/commentStore";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import * as S from "./CommentItem.style";
import UserStore from "../../../../store/userStore";
import {AdditionalFeaturesModerator} from "../../../../guards/roleGuards";
import {ProfileItemButton} from "../../../profile/profileItem/ProfileItem.style";
import Spinner from "../../../../components/Spinner";
import PostStore from "../../../../store/postStore";
import {Comment} from "../../../../types/commentType";

interface CommentItemProps {
    postId?: number,
    refreshComments?: number,
    setRefreshComments?: (value: (((prevState: number) => number) | number)) => void
}

const CommentItem: React.FC<CommentItemProps> = ({postId, refreshComments, setRefreshComments}) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getData = async () => {
            await Promise.all([
                CommentStore.getComments(postId || null, page, pageSize),
                UserStore.getUsers()
            ]);
            setComments(CommentStore.comments);
        }

        getData()
    }, [refreshComments || pageSize])

    const nextComments = async () => {
        setLoading(false);
        setPageSize(pageSize + 5);
        await CommentStore.getComments(postId || null, page, pageSize);
        setComments(CommentStore.comments);
        setLoading(true);
    }

    const deleteComment = async (e: React.MouseEvent, id: number | null) => {
        e.preventDefault();
        await CommentStore.deleteComment(id);
        if (setRefreshComments) {
            setRefreshComments(prev => prev + 1)
        }
    }


    const findUserByCommentId = (userId: number | null) => {
        return UserStore.allUsers.find(user => user.id === userId);
    }

    if (!PostStore.postById || UserStore.user === null) return (
        <Spinner size={60} color="secondary"/>
    )
    return (
        <>
            {comments.map((comment) => {
                const user = findUserByCommentId(comment.user_id);
                console.log(user)
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
                                                    deleteComment(e, comment.id || null)
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
            {(!loading) ? <Spinner size={60} color="secondary"/> :
                <ProfileItemButton onClick={() => nextComments()}>Загрузить еще</ProfileItemButton>}
        </>
    );
};

export default CommentItem;