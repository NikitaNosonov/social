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
    --background: #262D35;
    --background-container: #344E69;
    --background-modal: #395475;
    --background-comment-container: #283d51;
    --background-add-button: #3a5673;
    --background-add-button-hover: #406183;
    --background-input: #d5d5d5;
    --color-underline: #223459;
    --color-title: #ededed;
    --color-text: #d5d5d5;
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
        --background: #dcdcdc;
        --background-container: #bababa;
        --background-modal: #d6d6d6;
        --background-comment-container: #dfdfdf;
        --background-add-button: #aeaeae;
        --background-add-button-hover: #e1e1e1;
        --background-input: #d5d5d5;
        --color-underline: #7b7b80;
        --color-title: #292929;
        --color-text: #424242;
        --color-navLink-text-hover: #ededed;
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
    width: 20vw;
    margin-top: 95vh;
    justify-content: center;
    position: fixed`