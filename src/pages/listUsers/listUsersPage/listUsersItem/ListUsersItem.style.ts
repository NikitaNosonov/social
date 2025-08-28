import styled from 'styled-components'
import {Button, TableCell} from "@mui/material";

export const TableCell1 = styled(TableCell)`
    && {
        color: var(--color-title);
        text-align: center;
        font-size: 18px;
        font-weight: 500;
    }`

export const TableCell2 = styled(TableCell)`
    && {
        color: var(--color-text);
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        border: none;
    }`

export const Btn = styled(Button)`
    && {
        margin-left: -45px;
        color: var(--color-text);
        
        &:hover {
            background-color: var(--background-add-button-hover);
        }
    }`