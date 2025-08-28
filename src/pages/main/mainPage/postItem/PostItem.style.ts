import styled from 'styled-components';
import {Button, TableCell} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';

export const PostItem = styled.div`
    transition: all 500ms ease;
    margin: 0 25px;
    max-width: 65vw;
    height: auto; 
    min-height: auto;
    border-bottom: 2px solid #0e1c31;
    box-sizing: border-box;`

export const PhotoContainer = styled(TableCell)`
    && {
        box-sizing: content-box;
        width: 350px;
        height: 270px;
        border: none;
    }`

export const PostItemPhoto = styled.img`
    width: 350px;
    height: 270px;`

export const PostItemText = styled.p`
    color: var(--color-text);
    font-size: 16px;
    margin-top: -3px;
    text-align: justify;
    max-height: 350px;`

export const TableCell1 = styled(TableCell)`
    && {
        border: none;
        display: flex;
        flex-direction: column;
        height: 34vh;
    }`

export const Btn1 = styled(Button)`
    && {
        align-self: flex-end;
        margin-top: auto;
    }`

export const IconContainer = styled.div`
    align-self: flex-end;
    margin-top: auto;
`

export const CommnetIcon = styled(CommentIcon)`
    && {
        transition: all 500ms ease;
        color: var(--color-text);
        margin-right: 10px;
        height: 23px;
        
        &:hover {
            padding: 5px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: var(--background-add-button-hover);   
        }
    }`

export const Delete = styled(DeleteIcon)`
    && {
        transition: all 500ms ease;
        color: var(--color-text);

        &:hover {
            padding: 5px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: var(--background-add-button-hover);
        }`