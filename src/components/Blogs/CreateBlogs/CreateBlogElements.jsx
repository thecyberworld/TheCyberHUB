import styled from "styled-components";
import { FcAddImage } from "react-icons/all";

export const AddImage = styled(FcAddImage)`
    font-size: 25px;
    cursor: pointer;
`;

export const CreateBlogContainer = styled.div`
    width: 170vh;
`;

export const BlogH = styled.h1`
    text-align: center;
    color: #c4c4c4;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 600px;
`;

export const BlogP = styled.p`
    text-align: center;
    color: #c4c4c4;
    margin: 5px 0 0 0;
    width: 100%;
    max-width: 600px;
`;

export const BlogFormContainer = styled.div`
    margin: 50px auto auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    background: #212121;
`;

export const Cover = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (max-width: 500px) {
        flex-direction: column;
        transition: 0.1s ease-in-out;
    }
`;
export const CoverLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: start;
    width: 100%;
    background: #0e0e0e;
    padding: 10px;
    border-radius: 2px;
    margin-bottom: 10px;
    @media (max-width: 500px) {
        margin-right: 0;
    }
`;

export const BlogFormCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    margin: 20px;
    width: 100%;
    max-width: 1200px;
`;

export const BlogFormInput = styled.input`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    text-underline-offset: 5px;

    padding: 5px;

    height: 50px;
    font-size: 20px;

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
export const BlogFormLabel = styled.label``;

export const BlogFormTextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: transparent;
    border: transparent;
    color: #fff;
    width: 100%;
    height: 400px;

    font-size: 20px;
    padding: 5px;

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

export const BlogFormSubmit = styled.button`
    padding: 10px;
    background: #1e1e1e;
    border: transparent;
    color: whitesmoke;
    border-radius: 5px;
    margin: 5px 0;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
`;
