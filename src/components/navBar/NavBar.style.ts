import styled from "styled-components";
import { NavLink as RouterLink } from "react-router-dom";

export const Nav = styled.div`
    margin-left: 125px;
    padding-top: 20px;
    display: flex;
    flex-direction: column`

export const NavLink = styled(RouterLink)`
    text-decoration: none;
    width: 90px;
    display: block;
    margin-top: 10px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #DADADA;
    transition: all 500ms ease;

    &:hover {
        background: #3e4657;
        color: #e8e7e7;
        transform: scale(1);
        border-radius: 5px;
    }`

export const NavLinkAdmContainer = styled.div`
    width: 10vw;
    justify-content: end;
    margin-top: 20px;
    border-top: 1px solid var(--color-text);
    &:hover {
        background: #3e4657;
        color: #e8e7e7;
        transform: scale(1);
        border-radius: 5px;}`

export const NavLinkAdm = styled(RouterLink)`
    text-decoration: none;
    width: 7.5vw;
    display: block;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-text);
    transition: all 500ms ease;

    &:hover {
        background: #3e4657;
        color: #e8e7e7;
        transform: scale(1);
        border-radius: 5px;
    }`
