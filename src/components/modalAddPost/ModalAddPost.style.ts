import styled from 'styled-components';
import {TextField} from "@mui/material";

export const Input = styled(TextField)`
    && {
        width: 2050vw;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        background: var(--background-input);
        border-radius: 10px;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 10px;`

export const DragContainer = styled.div`
    display: flex;
    justify-content: center;`