import styled from 'styled-components';
import {TextField} from "@mui/material";

export const ProfileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: var(--background-container);
    border-radius: 25px;
    min-width: 21.9vw;
    padding: 15px;
    height: fit-content;
    gap: 5px
`

export const Input = styled(TextField)`
    && {
        width: 21.9vw;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        background: var(--background-input);
        border-radius: 10px;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;`