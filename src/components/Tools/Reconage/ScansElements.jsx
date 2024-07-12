import styled from "styled-components";

export const ScansContainer = styled.div`
    color: #d0d7de;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const JSONDisplayContainer = styled.div`
    background-color: #191919;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
    white-space: pre-wrap;
    font-family: monospace;
`;

export const TargetsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const TargetCard = styled.div`
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;
