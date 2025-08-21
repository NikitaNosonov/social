import React from 'react';
import * as S from './PostItem.style'
import {Button, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import photo from "../../../../Снимок экрана 2025-05-30 в 20.57.52.png";


const PostItem = () => {
    return (
        <S.PostItem>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{border: 'none'}}>
                                <S.PostItemPhoto src={photo}/>
                            </TableCell>
                            <TableCell
                                style={{
                                    border: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '34vh'
                                }}>
                                <S.PostItemText>10 тяжелых фильмов, которые многие предпочитают не пересматривать.

                                    Они оставляют глубокий след и вызывают сильные эмоции, трудно забываются и требуют
                                    особой эмоциональной подготовки.</S.PostItemText>
                                <Button variant="contained" color="primary" type="submit" size="small"
                                        style={{alignSelf: 'flex-start', marginTop: 'auto'}}
                                >Прокомментировать</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </S.PostItem>
    );
};

export default PostItem;