import styled from "styled-components";
import {createGlobalStyle} from 'styled-components';

export const GlobalStyleDark = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    :root {
        --background: #dddddd;
        --background-container: #262D35;
        //--background-modal: #395475;
        //--background-comment-container: #4a5868;
        --background-add-button: #ff6527;
        --background-add-button-hover: #cd511f;
        --background-input: #d5d5d5;
        --color-underline: #223459;
        --color-title: #ededed;
        --color-text: #d5d5d5;
        //--color-navLink-text-hover: #353f4a;
        --color-text-hover: coral;
    }`

export const GlobalStyleLight = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    :root {
        --background: #262D35;
        --background-container: #dddddd;
        //--background-modal: #d6d6d6;
        //--background-comment-container: #dddddd;
        --background-add-button: #3783cf;
        --background-add-button-hover: #3071b3;
        --background-input: #d5d5d5;
        --color-underline: #7b7b80;
        --color-title: #0b0b0b;
        --color-text: #202020;
        //--color-navLink-text-hover: #ededed;
        --color-text-hover: coral;
    }`

export const App = styled.div`
    width: 100vw;
    min-height: 100vh;
    height: auto;
    background: var(--background);
    display: flex;
    flex-direction: column;`

export const SwitchThemeContainer = styled.div`
    display: flex;
    width: 13.5vw;
    margin-top: 95vh;
    justify-content: center;
    position: fixed`