import React from 'react';
import * as S from './PostItem.style'
import {
    Button,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as R from "../../../../routes/Routes";
import PostStore from "../../../../store/postStore";
import Spinner from "../../../../components/Spinner";
import {observer} from "mobx-react-lite";


const PostItem = observer(() => {
    const navigate = useNavigate();

    React.useEffect(() => {
        PostStore.getPosts()
    }, []);

    const switchingToCommentPage = (postId: number | null) => {
        navigate(`/${R.commentRoute}`)
        localStorage.setItem('postId', String(postId))
    }

    return (
        PostStore.posts.length === 0 ? (
            <Spinner size={60} color="secondary"/>
        ) : (
            <>
                {PostStore.posts.map((post) => (
                    <S.PostItem key={post.id}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <S.TableCell1>
                                            <S.PostItemText>{post.description}</S.PostItemText>
                                            <S.IconContainer>
                                                <S.CommnetIcon onClick={() => switchingToCommentPage(post.id || null)}/>
                                                <S.Delete onClick={(e) => {
                                                    e.preventDefault();
                                                    PostStore.deletePostById(post.id)
                                                }}/>
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
                ))}
            </>
        )
    );
});

export default PostItem;