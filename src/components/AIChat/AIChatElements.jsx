import styled from "styled-components";

export const AIChatContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    flex-direction: row;

    max-width: 1500px;
    width: 100%;
    margin: 0 auto;

    height: 100%;

    //padding: 20px;

    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const ChatBox = styled.div`
    display: flex;
    background: #111111;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #464646;
    border-radius: 10px;
    font-size: 18px;
    width: 100%;
    max-width: 1100px;
    gap: 25px;
    padding: 25px;
`;

export const ChatHeader = styled.div`
    text-align: center;
`;

export const ChatTitle = styled.h1`
    background: #252525;
    color: #fff;
    border-radius: 10px;
    transition: background 0.3s ease;
    padding: 10px 15px;
    font-size: 25px;
    text-align: center;
`;

export const ChatInput = styled.form`
    display: flex;

    gap: 10px;

    input {
        padding: 10px 15px;

        flex: 1;
        background: #1a1c1d;
        color: #fff;
        border: 1px solid #464646;
        border-radius: 5px;
        font-size: 18px;
        outline: none;

        &::placeholder {
            color: #464646;
        }

        &:focus {
            border: 1px solid #ff6b08;
        }

        &:hover {
            border: 1px solid #ff6b08;
        }

        &:active {
            border: 1px solid #ff6b08;
        }
    }

    button {
        padding: 10px 15px;
        background-color: #ff6b08;
        color: #151515;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

export const BotMessage = styled.div`
    border-radius: 5px;

    &.bot {
        align-self: flex-start;
    }

    &.user {
        align-self: flex-end;
    }

    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const UserMessage = styled.div`
    border-radius: 5px;
    align-self: flex-end;

    font-family: "Roboto", sans-serif;
    font-size: 16px;
    padding: 15px;

    background: #252525;
    color: #fff;

    width: 100%;

    .message-content {
        word-wrap: break-word; /* Ensure long words break and don't overflow */
        overflow-wrap: break-word; /* Ensure word breaks for non-breaking spaces */
    }
`;

export const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
`;

export const ErrorMessage = styled.div`
    color: #ff4c4c;
    margin-top: 20px;
`;

export const Messages = styled.div`
    border-radius: 5px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: 100%;
    max-height: 60vh;
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    font-size: 18px;
`;
