import styled from "styled-components";

export const MarkdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 30px 0;
    padding: 10px;
    border: 2px solid #4f4f4f;
    border-radius: 8px;
    box-shadow: 2px 2px #4f4f4f;
    max-width: ${(props) => props.maxWidth};
`;

export const MarkdownEditorPreviewContainer = styled.div`
    margin-bottom: 30px;
`;
export const MarkdownEditorContainer = styled.div``;
