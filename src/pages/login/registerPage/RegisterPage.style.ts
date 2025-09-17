import styled from 'styled-components';
import {Button, TextField} from "@mui/material";

export const RegisterPageContainer = styled.div`
    margin-inline: 27.5vw;
    margin-top: 13vh;
    width: 45vw;
    height: 75vh;
    background: var(--background-container);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;
    gap: 10px`

export const RegisterTitle = styled.h2`
    font-size: 28px;
    color: var(--color-title);
    text-align: center;`

export const RegisterInput = styled(TextField)`
    width: 34vw;
    align-self: center;
    border-radius: 10px;
    background: var(--background-input);`

export const RegisterButtonContainer = styled.div`
    display: flex;
    align-self: center;
    gap: 10px;
    margin-bottom: 20px`

export const RegisterButton = styled(Button)`
 &&{
    align-self: center;
    border-radius: 5px;
    width: 16.6vw;
    height: 4.5vh;
}`