import React from "react";
import styled from "styled-components";

const StyledPollContainer = styled.div`
    width: 40rem;
    background: white;
    text-align: left;
    min-height: 200px;
    margin: 0 auto;
    margin-top: 200px;
    margin-bottom: 50px;
    box-shadow: 0 0 8px 4px #858282;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 1rem;

    .title {
        font-size: 1.2em;
        color: black;
    }

    .information {
        font-size: 1em;
        color: gray;
    }

    .information-container {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .stacked-images {
        display: flex;
    }

    .image {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`;

const Image = styled.div`
    width: 25px;
    height: 25px;
    background-color: blue;
    border-radius: 50%;
    position: relative;
    margin-left: -10px;
    border: 1px solid white;
`;

const InformationContainer = ({ votes, daysLeft }) => (
    <div className="information-container">
        <div className="stacked-images">
            <Image />
            <Image />
            <Image />
        </div>
        <p className="information">{votes}</p> <span>.</span> <p className="information">{daysLeft}</p>
    </div>
);

export const PollContainer = ({ title, votes, daysLeft, children }) => {
    return (
        <StyledPollContainer>
            <h3 className="title">{title}</h3>
            {children}
            <InformationContainer votes={votes} daysLeft={daysLeft} />
        </StyledPollContainer>
    );
};
