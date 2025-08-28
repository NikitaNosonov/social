import styled from 'styled-components';
import {TextField} from "@mui/material";

export const Input = styled(TextField)`
    && {
        width: 71vh;
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