import styled from 'styled-components';
import {TableCell} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const AvatarComment = styled.img`
    border-radius: 50%;
    width: 4vw;`

export const NameProfile = styled.h3`
    font-weight: bold;
    font-size: 16px;
    margin: 0;
    color: var(--color-title);`

export const Comment = styled.p`
    max-height: 200px;
    min-height: 10px;
    width: 50vw;
    word-break: break-word;
    color: var(--color-text);
    font-size: 14px;`

export const TableCell1 = styled(TableCell)`
    width: 4vw;`

export const TableCell2 = styled(TableCell)`
    display: flex;
    justify-content: end;`

export const DeleteButton = styled(DeleteIcon)`
    color: var(--color-title);`