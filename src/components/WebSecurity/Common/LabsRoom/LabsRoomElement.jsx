import styled from "styled-components";

export const LabRoomContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const DescriptionSection = styled.div`
    border-radius: 7px;
    padding: 20px;
    border: 1px solid #232323;
    background: #131313;
    width: 100%;
`;

export const SolutionSection = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #232323;
    background: #131313;
    border-radius: 7px;
    padding: 20px;
    gap: 10px;
    width: 100%;
    max-width: 450px;
`;

export const Header = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const LabTitle = styled.label`
    font-size: 25px;
    font-weight: bold;
    font-family: "Courier New", monospace;
    color: #dcdcdc;
    padding: 15px;
    width: 100%;
`;

export const StartLabButton = styled.a`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding: 10px 10px 10px 15px;
    background-color: #ff6b08;
    color: #151515;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const Description = styled.p`
    background: #151515;
    padding: 15px;
    font-size: 16px;
    opacity: 0.8;
    white-space: pre-wrap;
    border: 1px solid #242425;
    border-radius: 5px;
`;

export const SolutionHeader = styled.div`
    width: 100%;
    display: flex;

    /* padding: 10px 20px; */
    justify-content: space-between;
    align-items: center;

    /* background-color: #1a1c1d; */
    cursor: pointer;
`;

export const SolutionTitle = styled.p`
    /* font-size: 20px;
    font-weight: bold;
    color: white; */
`;

export const SolutionToggleIcon = styled.span`
    font-size: 20px;
`;

export const SolutionHolder = styled.div`
    width: 100%;
    padding: 20px;
    background-color: #1a1a1a;
    border-radius: 5px;
    border: 1px solid rgb(40 40 40 / 63%);
`;

export const SolutionItem = styled.div`
    padding: 10px 0;
`;

export const SolutionIndex = styled.span`
    font-size: 16px;
    opacity: 0.8;
`;

export const SolutionText = styled.span`
    padding-left: 10px;
    font-size: 16px;
    opacity: 0.8;
`;

export const Button = styled.button`
    padding: 10px 15px;
    background-color: #ff6b08;
    color: #151515;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
