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

const compareStrings = (str1, str2) => {
    for (let i = 0, j = 0; i < str1.length || j < str2.length; i++, j++) {
        if (i >= str1.length) return false;
        if (j >= str2.length) return false;
        if (str1[i] !== str2[j]) return false;
    }
    return true;
};
const MarkdownEditor = ({ content, label, previewModeOnly, onCopyChanges }) => {
    const [value, setValue] = useState("");
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
                        return <input {...props} disabled={true} />;
                    },
                }}
            />
        );
    }
    const handleChange = (value) => {
        setValue(value);
        onCopyChanges(label, value);
    };

    const handleCheckBoxChange = (e) => {
        const textOfCheckBox = e.target.parentNode.textContent;
        const valueListOfLines = value.split("\n");
        const findCheckedBoxLineIndex = valueListOfLines.findIndex((item) => {
            console.log(item?.replace(/- \[ \]|- \[[^]]+/, ""), textOfCheckBox.split("\n")[0]);
            return compareStrings(item?.replace(/- \[ \]|- \[[^]]+/, ""), textOfCheckBox.split("\n")[0]);
        });
        valueListOfLines[findCheckedBoxLineIndex] = valueListOfLines[findCheckedBoxLineIndex].replace(
            /- \[ \]|- \[[^]]+/,
            (match) => (match === "- [ ]" ? "- [X]" : "- [ ]"),
        );
        handleChange(valueListOfLines.join("\n"));
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
                                <input
                                    {...props}
                                    disabled={false}
                                    onChange={(e) => {
                                        if (props.type === "checkbox") {
                                            const isChecked = e.target.hasAttribute("checked");
                                            handleCheckBoxChange(e);
                                            if (isChecked) {
                                                e.target.removeAttribute("checked");
                                            } else {
                                                e.target.setAttribute("checked", "checked");
                                            }
                                        }
                                    }}
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
                />
            </MarkdownEditorContainer>
        </MarkdownContainer>
    );
};

export default MarkdownEditor;
