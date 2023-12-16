import React, { useEffect, useState } from "react";
import { InputEditorContainer, InputEditorTheInput, InputEditorLabel } from "./InputEditorElements";

const InputEditor = ({ content, label, onCopyChanges }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(content);
    }, [content, label]);

    const handleChange = (e) => {
        setValue(e.target.value);
        onCopyChanges(label, e.target.value);
    };

    return (
        <InputEditorContainer>
            <InputEditorLabel>{label}</InputEditorLabel>
            <InputEditorTheInput type="text" onChange={handleChange} value={value} />
        </InputEditorContainer>
    );
};
export default InputEditor;
