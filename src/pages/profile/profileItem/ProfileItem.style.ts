import styled from 'styled-components';
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from "@mui/material/Skeleton";


export const ProfileItem = styled.div`
    display: flex;
    align-content: center;
    flex-direction: column;
    background: var(--background-container);
    border-radius: 15px;
    width: 39vw;
    padding: 15px;`

export const ProfileItemButton = styled.button`
    display: flex;
    justify-content: center;
    font-size: 15px;
    padding: 10px 25px;
    margin: 0 50px;
    background: var(--background-add-button);
    border: none;
    color: var(--color-title);
    transition: all 500ms ease;
    border-radius: 15px;

    &:hover {
        transform: scale(1.05);
        background: var(--background-add-button-hover);
    }`

export const ProfileItemTitle = styled.h2`
    color: var(--color-title);
    text-align: center`

export const Underline = styled.hr`
    width: 100%;
    background-color: var(--color-underline);
    border: none;
    height: 2px;`

export const ProfileItemPostContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;`

export const ProfileItemPhoto = styled.img`
    max-width: 350px;
    align-self: center;`

export const SkeletonPhoto = styled(Skeleton)`
    align-self: center;
    margin-bottom: 10px`

export const ProfileItemText = styled.p`
    color: var(--color-text);
    font-size: 14px;
    padding: 5px 10px;`

export const ProfileItemBtnContainer = styled.div`
    display: flex;
    gap: 20px;
    background: var(--background-container);
    margin: 0 10px;`

export const ModalAddPost = styled.div`
    background: var(--background-modal);
    color: var(--color-text);`

export const Icon = styled(IconButton)`
    background: var(--background-add-button-hover);

    &:hover {
        background: var(--background-add-button-hover);
    }`

export const Delete = styled(DeleteIcon)`
    color: var(--color-text);

    &:hover {
        var(--background-add-button-hover);
    }`

export const Edit = styled(EditIcon)`
    color: var(--color-text);`
