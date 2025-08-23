import styled from 'styled-components';
import {Button, TableCell} from "@mui/material";

export const PostItem = styled.div`
    transition: all 500ms ease;
    margin: 0 25px;
    max-width: 65vw;
    height: auto; 
    min-height: auto;
    border-bottom: 2px solid #0e1c31;

    &:hover {
        border-radius: 25px;
        background: #3e5d7e;
    }`

export const PostItemPhoto = styled.img`
    max-width: 350px;
    max-height: 270px;`

export const PostItemText = styled.p`
    color: #c5c5c5;
    font-size: 16px;
    margin-top: -3px`

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