import React from "react";
import styled from "styled-components";

const SubTopicContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
`;

const SubTopicTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #eeeeee;
`;

const SubTopicContent = styled.p``;

const LabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    background-color: #1a1a1a;
    align-items: center;
    border-radius: 20px;
    border: 2px solid #444444;
`;

const LabText = styled.p`
    background: #e07000;
    height: 100%;
    padding: 15px 25px;
    border-radius: 20px 0 0 20px;
`;

const LabTitle = styled.p`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    width: 100%;
    font: 400 20px "Roboto", sans-serif;
`;
// const LabLevel = styled.p`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   gap: 10px;
//   font-size: 16px;
//   background: rgba(0, 125, 255, 0.26);
//   color: #eeeeee;
//   padding: 2px 7px;
//   border-radius: 5px;
//   border: 1px solid #213844;
// `;

const LabLink = styled.a`
    text-decoration: none;
    color: #ecf0f1;
`;

const LabSolved = styled.p`
    background: #e07000;
    height: 100%;
    padding: 15px 25px;
    border-radius: 0 20px 20px 0;
`;

const SubTopic = ({ subtopic }) => {
    return (
        <SubTopicContainer id={subtopic.id} key={subtopic.id}>
            {/* // move to here */}
            <SubTopicTitle>{subtopic.title}</SubTopicTitle>
            <SubTopicContent>{subtopic.content}</SubTopicContent>
            {/* <p>Labs</p> */}
            {subtopic?.labs &&
                subtopic?.labs.map((lab, index) => (
                    <LabContainer key={index}>
                        <LabText>Lab</LabText>
                        <LabTitle>
                            <LabLink to={lab?.link}>{lab?.title}</LabLink>
                            {/* <LabLevel>{lab.level}</LabLevel> */}
                        </LabTitle>
                        <LabSolved>{lab?.title ? "Solved" : "Not Solved"}</LabSolved>
                    </LabContainer>
                ))}
        </SubTopicContainer>
    );
};

export default SubTopic;
