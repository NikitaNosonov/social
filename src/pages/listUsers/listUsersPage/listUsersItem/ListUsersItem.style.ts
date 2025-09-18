import styled from 'styled-components'
import {Button, Select, TableCell} from "@mui/material";

export const TableCell1 = styled(TableCell)`
    && {
        width: 90vw;
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

export const SelectRole = styled(Select)`
    && {
        background: var(--background-input);
        border: 1px solid var(--background-input);
        width: 10vw;

        &.Mui-focused {
            .MuiOutlinedInput-notchedOutline {
                border-color: var(--background-input);
                border-width: 1px;

            }
        }
        
        .MuiOutlinedInput-notchedOutline {
            border-color: var(--background-input); /* Обычный цвет границы */
        }

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: var(--background-input); /* Цвет границы при наведении */
        }`