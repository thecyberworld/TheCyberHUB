import React from "react";

const compareStrings = (str1, str2) => {
    for (let i = 0, j = 0; i < str1.length || j < str2.length; i++, j++) {
        if (i >= str1.length) return false;
        if (j >= str2.length) return false;
        if (str1[i] !== str2[j]) return false;
    }
    return true;
};
const CheckBoxClickable = ({ value, onChangeValue, disabled, ...props }) => {
    if (disabled) return <input {...props} disabled={true} />;

    const handleCheckBoxChange = (e) => {
        const textOfCheckBox = e.target.parentNode.textContent;
        const valueListOfLines = value.split("\n");
        const findCheckedBoxLineIndex = valueListOfLines.findIndex((item) =>
            compareStrings(item?.replace(/- \[ \]|- \[[^]]+/, ""), textOfCheckBox.split("\n")[0]),
        );
        valueListOfLines[findCheckedBoxLineIndex] = valueListOfLines[findCheckedBoxLineIndex].replace(
            /- \[ \]|- \[[^]]+/,
            (match) => (match === "- [ ]" ? "- [X]" : "- [ ]"),
        );
        onChangeValue(valueListOfLines.join("\n"));
    };

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
};
export default CheckBoxClickable;
