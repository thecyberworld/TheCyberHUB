import styled from "styled-components";

export const RecentChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;

    gap: 25px;
    width: 100%;
    max-width: 400px;

    padding: 25px;

    background: #111111; /* Adjusted background color */
    color: #fff;
    border: 1px solid #464646;
    border-radius: 10px; /* Increased border-radius for a softer look */
    font-size: 18px;

    .chat-title {
        padding: 15px;
        background: #252525;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #464646;
        }
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    p {
        text-align: center;
    }
`;

export const RecentChatsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-height: 100px;
    padding: 0 0 0 10px;

    .new-chat-button {
        padding: 5px 15px;
        font-size: 25px;
        font-weight: bold;
        background-color: #ff6b08; /* Green color for the new chat button */
        color: #151515;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        transition: background 0.3s ease;

        &:hover {
            color: #151515;
            background: #f38236; /* Darker green on hover */
        }
    }
`;

export const RecentChatsList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 15px;

    overflow-y: auto;
    height: 50vh;

    li {
        padding: 15px;
        background: #1c1c1b;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: #464646;
        }
    }
`;
