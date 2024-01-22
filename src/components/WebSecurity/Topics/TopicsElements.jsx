import styled from "styled-components";

export const StyledTopicsContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    //background-color: #1a1a1a; /* Black Dark Background Color */
    padding: 20px;
`;

export const StyledTopicCard = styled.div`
    width: 500px;
    padding: 20px;
    border: 2px solid #444444; /* Border Color */
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: left;
    background: #1a1a1a; /* Dark Card Background Color */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledTag = styled.span`
    display: inline-block;
    margin: 2px;
    padding: 4px 8px;
    background: #3d3d3d;
    border-radius: 4px;
    color: #a1a1a1; /* Tag Text Color */
`;
