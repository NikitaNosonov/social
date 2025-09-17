import styled from 'styled-components';

export const SwitchUser = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 1vh;
    padding: 5px;

    &:hover {
        background: var(--background-add-button-hover);
        padding: 5px;
        border-radius: 10px;
    }`

export const AvatarUser = styled.img`
    border-radius: 50%;
    width: 4vw;
    height: 7vh;`