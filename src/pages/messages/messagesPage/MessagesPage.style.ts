import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const Container = styled.div`
    display: flex;
    flex-direction: row`

export const MessagesPage = styled.div`
    display: flex;
    flex-direction: column;
    background: var(--background-container);
    width: 30vw;
    margin-left: 31vh;
    border-radius: 15px;
    margin-top: 30px;
    min-height: 89vh;
    overflow-y: hidden;`

export const MessagesPageSkeleton = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 5px`

export const Title = styled.h2`
    color: var(--color-title);
    text-align: center;`

export const Underline = styled.hr`
    width: 100%;
    background-color: var(--color-text);
    border: none;
    height: 2px;`

export const SwitchUser = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 1vh;
    padding: 5px;
    color: var(--color-text);

    &:hover {
        background: var(--background-add-button-hover);
        padding: 5px;
        border-radius: 10px;
    }`

export const AvatarUser = styled.img`
    border-radius: 50%;
    width: 4vw;
    height: 7vh;`