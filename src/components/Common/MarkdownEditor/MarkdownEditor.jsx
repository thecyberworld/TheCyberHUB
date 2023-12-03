import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { MarkdownContainer, MarkdownEditorContainer, MarkdownEditorPreviewContainer } from "./MarkdownEditorElements";
import rehypeSanitize from "rehype-sanitize";

const MarkdownEditor = ({ content, maxWidth }) => {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(content);
    }, [content]);

    return (
        <MarkdownContainer maxWidth={maxWidth}>
            <MarkdownEditorPreviewContainer>
                <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
            </MarkdownEditorPreviewContainer>
            <MarkdownEditorContainer>
                <MDEditor
                    value={value}
                    onChange={setValue}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                />
            </MarkdownEditorContainer>
        </MarkdownContainer>
    );
};

export default MarkdownEditor;
