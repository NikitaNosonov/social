import styled from "styled-components";

export const MainPage = styled.div`
    margin-left: 50px;
    width: 67vw;
    padding-top: 30px;
`

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 10vh;
    border-radius: 25px;
    background: var(--background-container);`

export const SearchInput = styled.input`
    background: white;
    border-radius: 10px;
    align-content: center;
    border: none;
    width: 60vw;
    min-height: 5vh;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    padding: 0 15px;`

export const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    margin-top: 15px;
    border-radius: 45px;
    min-height: 0;
    background: var(--background-container);`