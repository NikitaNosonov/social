import React, {useEffect, useState} from 'react';
import * as S from './PostItem.style'
import {Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as R from "../../../../routes/Routes";
import PostStore from "../../../../store/postStore";
import {observer} from "mobx-react-lite";
import {Post} from "../../../../types/postType";
import UserStore from "../../../../store/userStore";
import {AdditionalFeaturesModerator} from "../../../../guards/roleGuards";
import {ProfileItemButton} from "../../../profile/profileItem/ProfileItem.style"
import Skeleton from "@mui/material/Skeleton";

interface PostItemProps {
    posts?: Post[],
    nextPosts?: () => void,
    loading?: boolean,
    morePostBySearch?: boolean,
    setLoading?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const PostItem: React.FC<PostItemProps> = observer(({posts, nextPosts, loading, morePostBySearch, setLoading}) => {
    const navigate = useNavigate();
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const check = () => {
            try {
                const userRole = UserStore.user.role;
                if (userRole)
                    setRole(userRole)
            } catch (e) {
                console.error(e)
            } finally {
                if (setLoading) {
                    setLoading(false);
                }
            }
        }
        check()
    }, [])

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

    if (posts?.length === 0) {
        return (
            <S.PostItem>
                <S.TableCell2>
                    <S.SkeletonAvatar animation='wave' variant='circular'/>
                    <Skeleton animation='wave' variant='rounded' width={350} height={30}/>
                </S.TableCell2>
                <S.TableCell1>
                    <Skeleton animation='wave' variant='rounded' width={350} height={250}/>
                    <Skeleton animation='wave' variant='rounded'
                              style={{marginBottom: '10px'}}/>
                    <Skeleton animation='wave' variant='rounded'
                              style={{marginBottom: '10px'}}/>
                    <Skeleton animation='wave' variant='rounded'
                              style={{marginBottom: '10px'}}/>
                </S.TableCell1>
            </S.PostItem>
        )
    }
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
                                        {post.photo ?
                                            <S.PhotoContainer>
                                                <S.PostItemPhoto src={post.photo}/>
                                            </S.PhotoContainer> : null}
                                    </TableRow>
                                    <TableRow>
                                        <S.TableCell1>
                                            <S.PostItemText>{post.description}</S.PostItemText>
                                        </S.TableCell1>
                                    </TableRow>
                                    <TableRow>
                                        <S.IconContainer>
                                            <S.CommnetIcon
                                                onClick={() => switchingToCommentPage(post.id || null)}/>
                                            <AdditionalFeaturesModerator role={role}>
                                                <S.Delete onClick={(e) => {
                                                    e.preventDefault();
                                                    PostStore.deletePostById(post.id)
                                                }}/></AdditionalFeaturesModerator>
                                        </S.IconContainer>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </S.PostItem>
                );
            })}
            {morePostBySearch ? <ProfileItemButton onClick={() => nextPosts ? nextPosts() : null}>
                Загрузить еще</ProfileItemButton> : null}
        </>
    );
});

export default PostItem;