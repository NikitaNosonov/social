import React, {useEffect, useState} from 'react';
import * as S from './PostItem.style'
import {Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as R from "../../../../routes/Routes";
import PostStore from "../../../../store/postStore";
import Spinner from "../../../../components/Spinner";
import {observer} from "mobx-react-lite";
import {Post} from "../../../../types/postType";
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType"
import {AdditionalFeaturesModerator} from "../../../../guards/roleGuards";

interface PostItemProps {
    posts?: Post[]
}

const PostItem: React.FC<PostItemProps> = observer(({posts}) => {
    const navigate = useNavigate();

    useEffect(() => {
        UserStore.getUsers()
    }, []);

    const switchingToCommentPage = (postId: number | null) => {
        navigate(`/${R.commentRoute}`)
        localStorage.setItem('postId', String(postId))
    }

    const findUserByCommentId = (userId: number | null) => {
        return UserStore.allUsers.find(user => user.id === userId);
    }

    if (posts?.length === 0) return (
        <Spinner size={60} color="secondary"/>
    )
    return (
        <>
            {posts?.map((post) => {
                const user = findUserByCommentId(post.user_id);
                return (
                    <S.PostItem key={post.id}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <S.TableCell2>
                                            <S.AvatarComment src={user?.avatar}/>
                                            <S.PostItemText>{user?.name} {user?.surname}</S.PostItemText>
                                        </S.TableCell2>
                                    </TableRow>
                                    <TableRow>
                                        <S.TableCell1>
                                            <S.PostItemText>{post.description}</S.PostItemText>
                                            <S.IconContainer>
                                                <S.CommnetIcon
                                                    onClick={() => switchingToCommentPage(post.id || null)}/>
                                                <AdditionalFeaturesModerator>
                                                    <S.Delete onClick={(e) => {
                                                    e.preventDefault();
                                                    PostStore.deletePostById(post.id)
                                                }}/></AdditionalFeaturesModerator>
                                            </S.IconContainer>
                                        </S.TableCell1>
                                        <S.PhotoContainer>
                                            <S.PostItemPhoto src={post.photo}/>
                                        </S.PhotoContainer>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </S.PostItem>
                );
            })}
        </>
    );
});

export default PostItem;