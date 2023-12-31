import styled from "styled-components";
import { FiClipboard } from "react-icons/fi";

export const PassGenContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background: #252524;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px #000;

    min-height: 300px;
    height: 100%;
    max-height: 500px;

    width: 100%;
    max-width: 400px;
`;

export const PassGenHeading = styled.h1`
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
`;

export const GenerateButton = styled.button`
    background-color: #ff6b08;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #343834;
    border-radius: 10px;
    margin-bottom: 10px;

    width: 100%;

    &:focus {
        outline: none;
        box-shadow: 0 0 5px #ff6b08;
    }
`;

export const PasswordDisplayContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
`;

export const PasswordDisplay = styled.div`
    background-color: ${({ isStrong }) => (isStrong ? "#4CAF50" : "#373b37")};
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #343834;
    border-radius: 10px;
    color: white;
    width: 100%;
    align-content: center;
    text-align: center;
`;

export const CopyToClipboardButton = styled(FiClipboard)`
    color: #fff;
    cursor: pointer;

    font-size: 30px;
    padding: 5px;
    margin: 5px;
    background-color: #1a1c1d;
    border-radius: 10px;

    transition: color 0.2s ease-in-out;

    &:hover {
        color: #ff6b08;
    }
`;
