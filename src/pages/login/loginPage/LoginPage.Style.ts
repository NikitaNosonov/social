import styled from 'styled-components';
import {Button, TextField} from "@mui/material";

export const LoginPageContainer = styled.div`
    margin: 200px 27.5vw;
    width: 45vw;
    height: 45vh;
    background: var(--background-container);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;
    gap: 10px`

export const LoginTitle = styled.h2`
    font-size: 28px;
    color: var(--color-title);
    text-align: center;`

export const LoginInput = styled(TextField)`
    width: 34vw;
    align-self: center;
    border-radius: 10px;
    background: var(--background-input);`

export const LoginButton = styled(Button)`
    align-self: center;
    width: 18vw;
    top: 13px;`

export const LoginRegText = styled.p`
    color: var(--color-text);
    text-align: center;
    font-size: 16px;`

export const LoginReg = styled.a`
    color: var(--color-text);
    
    &:hover {
        color: var(--color-text-hover);
    }`