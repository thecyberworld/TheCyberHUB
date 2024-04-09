import React from "react";
import styled from "styled-components";
import { ImLab } from "react-icons/im";
import PreviewMarkdown from "src/components/Common/MarkdownPreview";

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

// const SubTopicContent = styled.p``;

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

export const LabContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    background-color: #151313;
    align-items: flex-start;
    border-radius: 10px;
    border: 1px solid #232222;
`;

export const LabText = styled.h1`
    font-size: 24px;
    text-align: center;
    color: #eeeeee;
    padding: 10px;
    align-content: center;
    width: 100%;
`;

export const Labs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    align-items: flex-start;
    width: 100%;
`;

export const LabTitle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    font-size: 16px;
    align-content: center;
    align-items: center;
`;

export const LabLink = styled.p`
    font-size: 16px;
    color: #eeeeee;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LabIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ed652f;
    padding: 5px;
    border: 1px solid #ed652f;
    border-radius: 5px;
    color: black;
`;

export const LabSolved = styled.p`
    height: 100%;
    padding: 2px 10px;
    font-size: 12px;
    border: 1px solid #ed652f;
    border-radius: 100px;
    background: rgba(224, 112, 0, 0.44);
`;

const SubTopic = ({ subtopic }) => {
    return (
        <SubTopicContainer id={subtopic.id} key={subtopic.id}>
            <SubTopicTitle>{subtopic.title}</SubTopicTitle>
            {/* <SubTopicContent>{subtopic.content}</SubTopicContent> */}
            <PreviewMarkdown content={subtopic.content} />

            {subtopic?.labs ? (
                <LabContainer>
                    {/* <LabText>Labs</LabText> */}
                    <Labs>
                        {subtopic?.labs.map((lab, index) => (
                            <LabTitle key={index}>
                                <LabLink to={lab?.link}>
                                    <LabIcon>
                                        <ImLab />
                                    </LabIcon>
                                    {lab?.title}
                                </LabLink>
                                <LabSolved>{"Completed"}</LabSolved>
                            </LabTitle>
                        ))}
                    </Labs>
                </LabContainer>
            ) : null}
        </SubTopicContainer>
    );
};

export default SubTopic;
