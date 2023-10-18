import styled from "styled-components";

export const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px;
`;
export const MessageContainerSelf = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px;
`;

export const SenderImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

export const MessageContent = styled.div`
    background-color: #1d232b;
    padding: 10px;
    border-radius: 10px;
    max-width: 300px;
    font-size: 14px;
`;

export const MessageContentSelf = styled.div`
    background-color: #4284db;
    padding: 10px;
    border-radius: 10px;
    max-width: 300px;
    font-size: 14px;
`;

export const Timestamp = styled.div`
    font-size: 12px;
    color: #bdbdbd;
    margin-top: 5px;
`;
