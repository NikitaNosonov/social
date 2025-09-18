import React, {useEffect, useState} from 'react';
import CommentStore from "../../../../store/commentStore";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import * as S from "./CommentItem.style";
import UserStore from "../../../../store/userStore";
import {AdditionalFeaturesModerator} from "../../../../guards/roleGuards";
import {ProfileItemButton} from "../../../profile/profileItem/ProfileItem.style";
import Spinner from "../../../../components/Spinner";
import PostStore from "../../../../store/postStore";


interface CommentItemProps {
    postId?: number,
    refreshComments?: number,
    setRefreshComments?: (value: (((prevState: number) => number) | number)) => void
}

const CommentItem: React.FC<CommentItemProps> = ({postId, refreshComments, setRefreshComments}) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null)
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const check = async () => {
            try {
                await UserStore.getUserById()
                const userRole = UserStore.user.role;
                if (userRole)
                    setRole(userRole)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading1(false);
            }
        }
        check()

    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                await CommentStore.getComments(postId || null, page, pageSize);
                await UserStore.getUsers();
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
                console.log('users', UserStore.allUsers)
                console.log('comments', CommentStore.comments)
            }
        }

        getData()
    }, [refreshComments || pageSize])

    const nextComments = async () => {
        setPageSize(pageSize + 5);
        await CommentStore.getComments(postId || null, page, pageSize);
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

    if (loading) {
        return (<Spinner size={60} color="secondary"/>)
    }
    return (
        <>
            {CommentStore.comments?.map((comment) => {
                const user = findUserByCommentId(comment.user_id);
                console.log(user)
                if (user) {
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
                                        {!loading1 ?
                                            <AdditionalFeaturesModerator role={role}>
                                                <S.TableCell2>
                                                    <IconButton>
                                                        <S.DeleteButton onClick={async (e) => {
                                                            deleteComment(e, comment.id || null)
                                                        }}/>
                                                    </IconButton>
                                                </S.TableCell2>
                                            </AdditionalFeaturesModerator> : null}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
            })}
            {(CommentStore.comments.length !== 0) ?
                <ProfileItemButton onClick={() => nextComments()}>Загрузить еще</ProfileItemButton> :
                null}
        </>
    );
};

export default CommentItem;