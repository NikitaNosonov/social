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
        --background: #134080;
        --background-container: #262D35;
        //--background-modal: #395475;
        --background-comment-container: #283d51;
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
        --background: #f1ded9;
        --background-container: #71b1f1;
        //--background-modal: #d6d6d6;
        --background-comment-container: #3d619f;
        --background-add-button: #007a8f;
        --background-add-button-hover: #005f70;
        --background-input: #d5d5d5;
        --color-underline: #7b7b80;
        --color-title: #e4e4e4;
        --color-text: #ffffff;
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