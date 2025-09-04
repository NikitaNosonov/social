import styled from 'styled-components';

export const DragAndDrop = styled.div`
    width: 21.9vw;
    height: 10vh;
    background: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    border-radius: 10px;`

export const DragAndDropText = styled.div`
    width: 17vw;
    border: 2px dashed var(--color-text);
    color: var(--color-text);
    font-size: 14px;
    padding: 10px;`

export const DragAndDropTextInput = styled.a`
    color: var(--color-text);
    font-size: 14px;
    border-bottom: 1px solid var(--color-text);
    &:hover {
        color: var(--color-text-hover);
        border-bottom: 1px solid var(--color-text-hover);

    }`