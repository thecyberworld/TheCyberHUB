import React from "react";
import { Label, Option, Select, SelectContainer } from "./MultipleSelectElements";

/*
optionsValuesWithLabels=[
    {
        value: string;
        label: string;
    }
]
*/
const MultipleSelect = ({ selectLabel, selectedValue, onValueSelect, optionsValuesWithLabels }) => {
    const optionsDisplay = optionsValuesWithLabels.map((option) => {
        return (
            <Option value={option.value} key={option.value}>
                {option.label}
            </Option>
        );
    });
    return (
        <SelectContainer>
            {selectLabel && <Label htmlFor="Select">{selectLabel}:</Label>}
            <Select
                name={selectLabel.toLowerCase()}
                value={selectedValue}
                onChange={(event) => onValueSelect(event.target.value)}
            >
                {optionsDisplay}
            </Select>
        </SelectContainer>
    );
};
export default MultipleSelect;
