import React from "react";
import styled from "styled-components";

const JustificationContainer = styled.div`
    background-color: #1a1c1d;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 0 3px 1px #ff6b07;
`;

const JustificationTitle = styled.h3`
    color: #ff6b07;
    font-size: 18px;
    margin-bottom: 10px;
`;

const JustificationText = styled.p`
    color: #cecac3;
    font-size: 16px;
`;

const AnswerJustification = ({ justification }) => {
    return (
        <JustificationContainer>
            <JustificationTitle>Explanation</JustificationTitle>
            <JustificationText>{justification}</JustificationText>
        </JustificationContainer>
    );
};

export default AnswerJustification;
