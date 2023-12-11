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
import CheckBoxClickable from "./CheckBoxClickable";
import useEditorImage from "./useEditorImage";

const MarkdownEditor = ({ content, label, previewModeOnly, onCopyChanges, pageName }) => {
    const [value, setValue] = useState("");
    const { onPasteImage, onDragOverImage, onDropImage } = useEditorImage(setValue, pageName);
    useEffect(() => {
        setValue(content);
    }, [content, label]);

    if (previewModeOnly) {
        return (
            <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: "normal", backgroundColor: "#000" }}
                components={{
                    input: (props) => {
                        return <CheckBoxClickable disabled={true} {...props} />;
                    },
                }}
            />
        );
    }
    const handleChange = (value) => {
        setValue(value);
        onCopyChanges(label, value);
    };

    return (
        <MarkdownContainer>
            <MarkdownLabel>{label}</MarkdownLabel>
            <MarkdownEditorPreviewContainer>
                <MDEditor.Markdown
                    source={value}
                    style={{
                        whiteSpace: "normal",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                    }}
                    components={{
                        input: (props) => {
                            return (
                                <CheckBoxClickable
                                    {...props}
                                    disabled={false}
                                    value={value}
                                    onChangeValue={handleChange}
                                />
                            );
                        },
                    }}
                />
            </MarkdownEditorPreviewContainer>
            <MarkdownEditorContainer>
                <MDEditor
                    value={value}
                    onChange={handleChange}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    preview="edit"
                    visibleDragbar={false}
                    onDrop={onDropImage}
                    onDragOver={onDragOverImage}
                    onPaste={onPasteImage}
                />
            </MarkdownEditorContainer>
        </MarkdownContainer>
    );
};

export default MarkdownEditor;
