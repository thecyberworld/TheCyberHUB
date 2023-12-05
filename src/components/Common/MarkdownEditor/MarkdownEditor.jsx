import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
    MarkdownContainer,
    MarkdownEditorContainer,
    MarkdownEditorPreviewContainer,
    MarkdownLabel,
} from "./MarkdownEditorElements";
import rehypeSanitize from "rehype-sanitize";
import "./MarkdownEditor.css";

const MarkdownEditor = ({ content, label, previewModeOnly }) => {
    const [value, setValue] = useState();
    useEffect(() => {
        setValue(content);
    }, [content]);

    if (previewModeOnly)
        return <MDEditor.Markdown source={value} style={{ whiteSpace: "normal", backgroundColor: "#000" }} />;

    return (
        <MarkdownContainer>
            <MarkdownLabel>{label}</MarkdownLabel>
            <MarkdownEditorPreviewContainer>
                <MDEditor.Markdown source={value} style={{ whiteSpace: "normal" }} />
            </MarkdownEditorPreviewContainer>
            <MarkdownEditorContainer>
                <MDEditor
                    value={value}
                    onChange={setValue}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    preview="edit"
                    visibleDragbar={false}
                />
            </MarkdownEditorContainer>
        </MarkdownContainer>
    );
};

export default MarkdownEditor;
