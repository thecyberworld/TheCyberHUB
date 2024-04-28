import styled from "styled-components";

export const AddCommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    max-width: 1200px;
    padding: 25px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

export const Label = styled.label``;

export const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    //border-radius: 5px;
    //padding: 10px;
    background: transparent;
    border: transparent;
    color: #f5f5f5;
    width: 100%;
    height: 50px;

    ::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #f5f5f5;
    }
`;
export const Input = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #f5f5f5;
    width: 100%;
    height: 50px;
    font-size: 15px;
    text-underline-offset: 5px;

    ::placeholder {
        color: #f5f5f5;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #f5f5f5;
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
export const addCommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    max-width: 1200px;
    padding: 30px;
    maxheight: 300px;
    overflowy: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const StyledForm = styled(Form)`
    border: 1px solid #ddd;
    padding: 30px;
    border-radius: 10px;
    maxheight: 200px;
    overflowy: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
