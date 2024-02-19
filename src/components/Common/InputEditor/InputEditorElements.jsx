import styled, { css } from "styled-components";

export const InputEditorContainer = styled.div`
    width: 100%;
`;
const InputEditorField = css`
    padding: 7px 12px;
    color: white;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #111111;
    box-shadow: 0 0 0 2px #090909;
    outline: none;
    line-height: 1;
    text-transform: capitalize;
    background-color: #090909;
    font: 16px "Poppins", sans-serif;
`;
export const InputEditorTheInput = styled.input`
    ${InputEditorField}
`;

export const InputEditorTextarea = styled.textarea`
    ${InputEditorField}
    resize: none;
`;

export const InputEditorLabel = styled.h2`
    text-transform: capitalize;
    text-align: center;
    color: #4f4f4f;
`;
