import styled from 'styled-components';
import {Button, Input} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const CommentPage = styled.div`
    background: var(--background-container);
    margin-top: 30px;
    margin-left: 50px;
    max-width: 67vw;
    min-width: 64vw;
    min-height: 85vh;
    max-height: 85vh;
    border-radius: 25px;
    padding: 25px;
    display: flex;
    flex-direction: column;`

export const ContentContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    max-height: 40vh`

export const ContentPhoto = styled.img`
    max-width: 320px;
    align-self: center;`

export const ContentText = styled.p`
    color: var(--color-text);
    font-size: 14px;
    padding: 5px 10px;
    margin-top: -7px;`

export const CommentContainer = styled.div`
    min-width: 65vw;
    max-width: 65vw;
    min-height: 32vh;
    max-height: 32vh;
    background: var(--background-comment-container);
    color: white;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
    margin-top: auto;`

export const InputContainer = styled.div`
    display: flex;
    margin-top: 20px;`

export const InputComment = styled(Input)`
    && {
        background: var(--background-input);
        border-radius: 10px;
        padding: 7px;
        width: 62.5vw;
        align-self: flex-start;
        margin-top: auto;

        &.MuiInput-underline:before {
            display: none;
        }

        &.MuiInput-underline:after {
            display: none;
        }

        &.MuiInput-underline:hover:not(.Mui-disabled):before {
            display: none;
        }
    }`

export const BtnSendContainer =styled.div`
    margin-left: 10px;
    height: 25px;
    width: 25px;
    background: #12a573;
    color: var(--color-text);
    border-radius: 5px;
    padding: 10px;
    transition: all 500ms ease;

    &:hover {
        background: #0c714f;
    }`