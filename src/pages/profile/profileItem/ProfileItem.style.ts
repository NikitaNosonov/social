import styled from 'styled-components';

export const ProfileItem = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: #344E69;
    border-radius: 25px;
    min-width: 39vw;
    margin-left: calc(24vw + 30px);
    margin-right: 14.5vw;
    padding: 15px;`

export const ProfileItemButton = styled.button`
    display: flex;
    justify-content: center;
    font-size: 15px;
    padding: 10px 25px;
    margin: 0 50px;
    background: #3a5673;
    border: none;
    color: #bdbdbd;
    transition: all 500ms ease;
    border-radius: 15px;

    &:hover {
        transform: scale(1.05);
        background: #406183;
    }`

export const ProfileItemTitle = styled.h2`
    color: #dfdfdf;
    text-align: center`

export const Underline = styled.hr`
    width: 100%;
    background-color: #223459;
    border: none;
    height: 2px;`

export const ProfileItemPostContainer = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;`

export const ProfileItemPhoto = styled.img`
    max-width: 350px;
    align-self: center;`

export const ProfileItemText = styled.p`
    color: #d5d5d5;
    font-size: 14px;
    padding: 5px 10px;`

export const ProfileItemBtnContainer = styled.div`
    display: flex;
    gap: 20px;
    background: #344E69;
    margin: 0 10px;`

export const ModalAddPost = styled.div`
    background: #1d4670;
    color: #d5d5d5;`