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
import useImageUploadEvents from "./useImageUploadEvents";

const MarkdownEditor = ({ content, label, previewModeOnly, onCopyChanges, pageName }) => {
    const [value, setValue] = useState("");

    const handleChange = (value) => {
        setValue(value);
        onCopyChanges(label, value);
    };

    const { onPasteImage, onDragOverImage, onDropImage } = useImageUploadEvents(value, handleChange, pageName);

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
                    img: (props) => {
                        return <img {...props} className="image" />;
                    },
                }}
            />
        );
    }

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
                    className="preview"
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
                        img: (props) => {
                            return <img {...props} className="image" />;
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
