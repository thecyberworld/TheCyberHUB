import styled from "styled-components";

export const LabRoomContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const DescriptionSection = styled.div`
    background: #1a1c1d;
    border-radius: 7px;
    padding: 20px;
    border: 1px solid #464646;
    width: 100%;
`;

export const SolutionSection = styled.div`
    display: flex;
    flex-direction: column;
    background: #1a1c1d;
    border-radius: 7px;
    padding: 20px;
    border: 1px solid #464646;
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
    padding: 15px;
`;

export const LabTitle = styled.label`
    font-size: 20px;
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
    background: #151717;
    padding: 15px;
    font-size: 16px;
    opacity: 0.8;
    white-space: pre-wrap;
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
