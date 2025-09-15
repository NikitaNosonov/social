import styled, { keyframes } from 'styled-components';
import {TextField} from "@mui/material";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideInFromBottom = keyframes`
    from {
        transform: translateY(16px);
    }
    to {
        transform: translateY(0);
    }
`;

export const ChatItem = styled.div`
    display: flex;
    background: var(--background-container);
    margin-left: 2vw;
    height: 93vh;
    width: 35vw;
    margin-top: 30px;
    border-radius: 15px;
    overflow-y: hidden;`

export const ChatItemContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    flex-direction: column;
    color: var(--color-text);
    padding: 2vw;`

export const ChatItemContent = styled.div`
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 2vh;
    border-radius: 10px;
    width: 30vw;
    height: 81%;
    padding: 10px;
    background: var(--background-comment-container);`

export const NonMessageTitle = styled.h2`
    text-align: center`

export const MessageItem = styled.div`
    color: var(--color-text);
    padding-block: 5px;`

export const MessageAnimation = styled.div`
    animation: ${fadeIn} 0.3s ease-in-out,
    ${slideInFromBottom} 0.3s ease-in-out;
    animation-fill-mode: both;`

export const SendContainer = styled.form`
    display: flex;
    margin-top: 2.5vh;`

export const InputMessage = styled(TextField)`
    &&{
        border-radius: 10px;
        background: var(--background-input);
        border: none;
        width: 82%;
    }`

export const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    background: var(--background);
    border-radius: 10px;
    margin-left: 1vw;
    width: 15%;
    transition: all 500ms ease;

    &:hover {
        background: var(--background-add-button-hover);
    }`
