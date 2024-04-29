import styled from "styled-components";

export const AddCommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    max-width: 1200px;
    padding: 30px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    color: #f5f5f5;
    border: 1px solid rgb(65, 65, 65);
    background: transparent;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;

    padding: 30px;
    border-radius: 10px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const Label = styled.label``;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
    color: #f5f5f5; /* Modify this line */
    width: 100%;
    height: 50px;
    font-size: 15px;
    text-underline-offset: 5px;
    border: 1px solid rgb(65, 65, 65);

    &:focus {
        outline: none;
    }

    &:hover {
        border: 1px solid #aaa;
    }

    &::placeholder {
        color: #999;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: #f5f5f5;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
`;
