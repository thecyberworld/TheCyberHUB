import React, { useEffect, useState } from "react";
import { InputEditorContainer, InputEditorTheInput, InputEditorLabel, InputEditorPreview } from "./InputEditorElements";

const InputEditor = ({ content, label }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(content);
    }, [content, label]);

    return (
        <InputEditorContainer>
            <InputEditorLabel>{label}</InputEditorLabel>
            <InputEditorPreview>{value}</InputEditorPreview>
            <InputEditorTheInput type="text" onChange={(e) => setValue(e.target.value)} value={value} />
        </InputEditorContainer>
    );
};
export default InputEditor;
