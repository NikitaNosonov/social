import styled from 'styled-components';

export const ProfileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: var(--background-container);
    border-radius: 25px;
    min-width: 24vw;
    position: fixed;
    padding-bottom: 15px;
    height: fit-content;
`

export const ProfilePhoto = styled.img`
    border-radius: 100%;
    max-width: 200px;
    margin: 20px 72px`

export const ProfileName = styled.h2`
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-title);
    text-align: center;
    margin: 10px;`

export const ProfileNameText = styled.p`
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: var(--color-title);
    text-align: center;
    margin: 3px;`

export const ProfileButtonContainer = styled.div`
    margin: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;`
