import styled from 'styled-components';
import {TextField} from "@mui/material";

export const Input = styled(TextField)`
    && {
        width: 39vw;
        height: auto;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        background: #d5d5d5
    }
`

export const ProfileItemPhoto = styled.img`
    max-width: 350px;
    align-self: center;
    margin-bottom: 10px`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;`