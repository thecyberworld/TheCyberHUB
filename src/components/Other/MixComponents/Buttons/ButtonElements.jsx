import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export const IconsSpacing = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`;
export const IconsSpacing2 = styled.span`
    margin: 7px 0 0 3px;
    display: inline;
    flex-direction: row;
`;

export const ScrollButton = styled(ScrollLink)`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #ff6b08;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        font-size: 18px;
    }
`;

export const RouterButton = styled(RouterLink)`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #ff6b08;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const RedirectButton = styled.a`
    margin: auto 10px 10px 10px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    background: transparent;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #ff6b08;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: transparent;
        border-color: #343434;
        scale: 1.1;
        font-size: 16px;
    }
`;

export const ButtonGreen = styled.button`
    padding: 15px 10px;
    font-size: 1.5rem;
    background: rgb(16, 16, 16);
    color: rgb(245, 245, 245);
    border: 1px solid rgb(42, 42, 42);
    border-radius: 5px;
    margin: 5px 0px;
    width: 100%;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #ff6b08;
        color: black;
        border-color: #343434;
    }
`;

export const LoadingButton = styled.button`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #000000;
    background: #ff6b08;
    box-shadow: 0 0 30px rgba(32, 194, 14, 0);
    animation: glowing 2s ease-in-out infinite;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
        50% {
            box-shadow: 0 0 60px 15px #ff6b08;
        }
        100% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
    }
    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const LoadingRedirectButton = styled(RouterLink)`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #f5f5f5;
    background: #ff6b08;
    box-shadow: 0 0 30px rgba(32, 194, 14, 0);
    animation: glowing 2s ease-in-out infinite;

    @keyframes glowing {
        0% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
        50% {
            box-shadow: 0 0 60px 15px #ff6b08;
        }
        100% {
            box-shadow: 0 0 30px rgba(32, 194, 14, 0);
        }
    }
    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;

export const RouterButtonGreen = styled(RouterLink)`
    text-decoration: none;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #343434;
    white-space: nowrap;
    padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
    font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    color: #f5f5f5;
    background: #0d0f11;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #ff6b08;
        color: black;
        scale: 1.01;
        border-color: #343434;
        // font-size: 18px;
    }

    @media screen and (max-width: 600px) {
        padding: 10px 10px;
    }
`;
