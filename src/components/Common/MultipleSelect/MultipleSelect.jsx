import React from "react";
import { Option, Select, SelectContainer } from "./MultipleSelectElements";

/*
optionsValuesWithLabels=[
    {
        value: string;
        label: string;
    }
]
*/
const MultipleSelect = ({ selectLabel, selectedValue, onValueSelect, optionsValuesWithLabels, defaultValue }) => {
    const optionsDisplay = optionsValuesWithLabels.map((option) => {
        return (
            <Option value={option.value} key={option.value}>
                {option.label}
            </Option>
        );
    });
    return (
        <SelectContainer>
            {selectLabel && <label htmlFor="Select">{selectLabel}:</label>}
            <Select
                name={selectLabel.toLowerCase()}
                value={defaultValue || selectedValue}
                onChange={(event) => onValueSelect(event.target.value)}
            >
                {optionsDisplay}
            </Select>
        </SelectContainer>
    );
};
export default MultipleSelect;
