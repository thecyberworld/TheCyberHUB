import styled from "styled-components";
import { FcAddImage } from "react-icons/all";

export const createContent = styled.input``;
export const SectionCreateBlog = styled.div`
    display: flex;
    flex-direction: column;
`;
export const CreateBlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 1200px;
`;
export const AddImage = styled(FcAddImage)`
    font-size: 25px;
    cursor: pointer;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 1000px;
    margin: 10px;
`;

export const Label = styled.label``;

export const Input = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 50px;
    font-size: 30px;
    text-underline-offset: 5px;
    margin: 10px 0;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const TextArea = styled.textarea`
    margin: 10px 0;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 400px;

    ::placeholder {
        color: #fff;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background: transparent;
        border: transparent;
        color: #fff;
    }
`;

export const Submit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
`;
