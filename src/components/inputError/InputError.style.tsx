import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: inline-block;
    left: 5.5vw;
    width: 100%;
    top: -10px
`;

export const ErrorPopup = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid #000000;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 200px;

    &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 12px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-left: 1px solid #000000;
        border-top: 1px solid #000000;
        transform: rotate(45deg);
    }
`;

export const ErrorText = styled.span`
    color: red;
    font-size: 10px;
    text-align: center;
`