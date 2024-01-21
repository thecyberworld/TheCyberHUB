import styled from "styled-components";

export const LabContainer = styled.div`
    width: 81%;
    height: 700px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;
export const LabCategory = styled.div`
    background-color: rgb(19, 19, 19);
    width: 287px;
    padding: 20px;
    margin-right: 20px;
`;
export const RoomContainer = styled.div`
    width: 100%;
    height: 100%;
`;
export const LevelContainer = styled.div`
    background: #131313;
    width: 390px;
    height: 42px;
    display: flex;
    flex-direction: row;
    border-radius: 7px;
    overflow: clip;
`;
export const Search = styled.input`
    padding: 10px 15px;

    flex: 1;
    background: #1a1c1d;
    color: #fff;
    border: 1px solid #464646;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
    margin-left: 20px;

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
`;
