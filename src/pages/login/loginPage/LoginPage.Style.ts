import styled from 'styled-components';
import {Button, TextField} from "@mui/material";
import {NavLink as RouterLink} from "react-router-dom";

export const LoginPageContainer = styled.div`
    margin: 200px 27.5vw;
    width: 45vw;
    height: 45vh;
    background: var(--background-container);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;`

export const LoginTitle = styled.h2`
    font-size: 28px;
    color: var(--color-title);
    text-align: center;
    margin-bottom: 0`

export const LoginInput = styled(TextField)`
    width: 34vw;
    align-self: center;
    border-radius: 10px;
    background: var(--background-input);`

export const LoginButton = styled(Button)`
    align-self: center;
    width: 18vw;
    top: 13px;
    border-radius: 5px`

export const LoginRegText = styled.p`
    color: var(--color-text);
    text-align: center;
    font-size: 16px;`

export const LoginReg = styled(RouterLink)`
    color: var(--color-text);
    
    &:hover {
        color: var(--color-text-hover);
    }`

export const WrongContainer = styled.p`
    height: 1vh;
    color: red;
    text-align: center;
    margin: 0;
    top: -30px`