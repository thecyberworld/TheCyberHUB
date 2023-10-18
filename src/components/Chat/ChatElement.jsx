import styled from "styled-components";

export const ChatRoutesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    max-width: 1500px;
`;

export const ChatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    z-index: 1000;
    top: 0;
    width: 100%;
    border-bottom: 1px solid white;

    max-width: 1500px;
`;

export const ChatItemsContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 25px;
    border-radius: 10px;
    color: #f5f5f5;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

export const LeftNav = styled.div`
    font-size: 28px;
    margin-right: 1px;
    display: flex;
    align-items: center;
`;
export const RightNav = styled.div`
    font-size: 28px;
    margin-right: 1px;
    width: 15%;
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
`;

export const Chatbox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
`;
