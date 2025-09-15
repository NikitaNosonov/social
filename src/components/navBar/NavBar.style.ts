import styled from "styled-components";
import { NavLink as RouterLink } from "react-router-dom";

export const Nav = styled.div`
    padding-top: 4vh;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--background-container);
    position: fixed;`

export const NavLink = styled(RouterLink)`
    text-decoration: none;
    width: 13.1vw;
    display: block;
    padding-left: 10px;
    padding-block: 7px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-text);
    transition: all 500ms ease;

    &:hover {
        background: var(--background-add-button-hover);
        transform: scale(1);
        padding-block: 7px
    }`

export const NavLinkAdmContainer = styled.div`
    width: 13.8vw;
    justify-content: end;
    margin-top: 5px;
    border-top: 1px solid var(--color-text);
    &:hover {
        background: var(--background-add-button-hover);
        transform: scale(1);
    }`
