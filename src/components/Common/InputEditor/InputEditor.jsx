import React, { useEffect, useState } from "react";
import { InputEditorContainer, InputEditorTheInput } from "./InputEditorElements";

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
            <InputEditorTheInput type="text" onChange={handleChange} value={value} placeholder={"Note Heading"} />
        </InputEditorContainer>
    );
};
export default InputEditor;
