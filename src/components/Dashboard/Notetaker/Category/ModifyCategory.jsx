import React, { useEffect, useState } from "react";
import {
    ModifyCategoryModalButtons,
    ModifyCategoryModalCancel,
    ModifyCategoryModalContainer,
    ModifyCategoryModalInput,
    ModifyCategoryModalSubmit,
} from "./CategoryElements";

const ModifyCategory = ({ onSave, onCancel, editCategoryName = "" }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(editCategoryName);
    }, [editCategoryName]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <ModifyCategoryModalContainer>
            <ModifyCategoryModalInput type="text" onChange={handleChange} value={value} placeholder={"Category Name"} />
            <ModifyCategoryModalButtons>
                <ModifyCategoryModalSubmit onClick={() => onSave(value)}>Save</ModifyCategoryModalSubmit>
                <ModifyCategoryModalCancel onClick={onCancel}>Cancel</ModifyCategoryModalCancel>
            </ModifyCategoryModalButtons>
        </ModifyCategoryModalContainer>
    );
};
export default ModifyCategory;
