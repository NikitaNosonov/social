import React from 'react';
import * as S from './PostItem.style'
import {Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import photo from "../../../../Снимок экрана 2025-05-30 в 20.57.52.png";
import {data, useNavigate} from "react-router-dom";
import * as R from "../../../../routes/Routes";
import {Post} from "../../../../types/postType";
import PostStore from "../../../../store/postStore";
import Spinner from "../../../../components/Spinner";


const PostItem = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        PostStore.getPosts()
    }, []);

    return (
        PostStore.posts.length === 0 ? (
            <Spinner size={60} color="secondary" />
        ) : (
            <>
                {PostStore.posts.map((post) => (
                    <S.PostItem key={post.id}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{border: 'none'}}>
                                            <S.PostItemPhoto src={post.photo}/>
                                        </TableCell>
                                        <S.TableCell1>
                                            <S.PostItemText>{post.description}</S.PostItemText>
                                            <S.Btn1
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => navigate(`/${R.commentRoute}`)}
                                            >
                                                Прокомментировать
                                            </S.Btn1>
                                        </S.TableCell1>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </S.PostItem>
                ))}
            </>
        )
    );
};

export default PostItem;