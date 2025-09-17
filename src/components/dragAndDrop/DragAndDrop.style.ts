import styled from 'styled-components';

export const DragAndDrop = styled.div`
    width: 100%;
    height: 10vh;
    background: var(--background-input);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    border-radius: 10px;`

export const DragAndDropText = styled.div`
    width: 17vw;
    border: 2px dashed black;
    color: black;
    font-size: 14px;
    padding: 10px;`

export const DragAndDropTextInput = styled.a`
    color: black;
    font-size: 14px;
    border-bottom: 1px solid black;
    &:hover {
        color: var(--color-text-hover);
        border-bottom: 1px solid var(--color-text-hover);
    }`