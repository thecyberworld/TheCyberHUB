import styled from "styled-components";
import { RoadmapContentHeading } from "../Learn/Roadmaps/RoadmapElements";

export const HackBookContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    width: 100%;
    max-width: 1500px;
`;

export const HackBookTitle = styled.h1`
    padding: 15px 25px;
    text-align: center;
    align-content: center;
    justify-content: center;
`;

export const HackBookHeading = styled.p``;

export const UL = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding: 0 18px;
    text-align: center;
    align-content: center;
    justify-content: center;
`;

export const ContentNavData = styled.div`
    display: flex;
    background: #1d1f21;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
`;

export const LI = styled(RoadmapContentHeading)`
    width: 100%;
    font-size: 16px;
    //padding: 0 0 0 25px;
`;

export const ContentNav = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    //padding: 10px;
    width: 100%;
    border: #2f2f2f 1px solid;
    border-radius: 10px 0 0 10px;
`;

export const ContentData = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 25px;
    width: 100%;
    border: #2f2f2f 1px solid;
    border-radius: 0 10px 10px 0;
`;
