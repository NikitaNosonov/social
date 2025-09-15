import styled from "styled-components";

export const MainPage = styled.div`
    width: 67vw;
    padding-top: 30px;
    margin-left: 31vh;`

export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 10vh;
    border-radius: 12px;
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
    border-radius: 15px;
    min-height: 0;
    background: var(--background-container);`