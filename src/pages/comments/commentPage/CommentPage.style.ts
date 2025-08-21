import styled from 'styled-components';
import {Input} from "@mui/material";

export const CommentPage = styled.div`
    background: #344E69;
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
    flex-direction: row;`

export const ContentPhoto = styled.img`
    width: 400px;
    align-self: center;`

export const ContentText = styled.p`
    color: #d5d5d5;
    font-size: 14px;
    padding: 5px 10px;
    margin-top: -7px;`

export const CommentContainer = styled.div`
    min-width: 65vw;
    max-width: 65vw;
    min-height: 30vh;
    max-height: 30vh;
    background: #283d51;
    color: white;
    padding: 10px;
    border-radius: 5px;`



export const InputComment = styled(Input)`
    && {
        background: white;
        border-radius: 10px;
        padding: 7px;
        width: 53vw;
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