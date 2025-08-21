import React from 'react';
import * as S from './PostItem.style'
import {Button, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import photo from "../../../../Снимок экрана 2025-05-30 в 20.57.52.png";
import {useNavigate} from "react-router-dom";
import * as R from "../../../../routes/routes";


const PostItem = () => {
    const navigate = useNavigate();

    return (
        <S.PostItem>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>
                                <S.PostItemPhoto src={photo}/>
                            </TableCell>
                            <S.TableCell1>
                                <S.PostItemText>10 тяжелых фильмов, которые многие предпочитают не пересматривать.

                                    Они оставляют глубокий след и вызывают сильные эмоции, трудно забываются и требуют
                                    особой эмоциональной подготовки.</S.PostItemText>
                                <S.Btn1 variant="contained" color="primary" type="submit" size="small"
                                        onClick={() => navigate(`/${R.commentRoute}`)}>Прокомментировать</S.Btn1>
                            </S.TableCell1>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </S.PostItem>
    );
};

export default PostItem;