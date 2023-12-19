import styled from "styled-components";
export const ChatRoutesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    //max-width: 1500px;
`;

export const ChatContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    z-index: 1000;
    top: 0;
    width: 100%;
    border-bottom: 1px solid gray;

    //max-width: 1500px;
`;

export const ChatItemsContainer = styled.div`
    width: 100%;
    height: 100vh;
    border: 1px solid gray;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    color: #f5f5f5;

    //@media screen and (max-width: 768px) {
    //    flex-wrap: wrap;
    //}
`;

export const LeftNav = styled.div`
    font-size: 25px;
    font-weight: bold;
    font-family: "Fire Code", monospace;
    display: flex;
    align-items: center;
`;
export const RightNav = styled.div`
    font-size: 20px;
    gap: 25px;
    display: flex;
    list-style: none;
    align-items: center;
`;

export const Chatbox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const MessageInputContainer = styled.div`
    border-top: 1px solid gray;
    width: 100%;
    position: relative;
`;

export const Message = styled.div`
    width: 100%;
    border-radius: 0 0 10px 10px;
    outline: none !important;
    background-color: #282828;
    position: relative;
    display: flex;
    flex-wrap: wrap;
`;

export const Input = styled.input`
    border: none !important;
    border-radius: 0 0 0 10px;
    display: block;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #ffffff;
    background-color: #414141;
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    position: relative;
    flex: 1 1 auto;
    width: 1%;

    &:focus {
        outline: none;
        border: none !important;
        box-shadow: none !important;
    }
`;

export const InputGroup = styled.span`
    background: transparent !important;
    border: none !important;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1.5rem;
    font-weight: b;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-weight: bold !important;
    cursor: pointer;
`;
