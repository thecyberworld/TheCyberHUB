import React from "react";
import { CategoriesListContainer, CategoriesListNoFound } from "./CategoryElements";
import CategoryItem from "./CategoryItem";

const CategoryList = ({
    required,
    children,
    onPick,
    pickedCategory,
    addMode,
    defaultCategory,
    onEditCategory,
    editCategoryId,
    showCheckboxes, // New prop to control whether to show checkboxes
}) => {
    return (
        <CategoriesListContainer required={required} addMode={addMode}>
            {!children.length && !addMode && (
                <CategoriesListNoFound>There Are No {<br />} Unique Categories</CategoriesListNoFound>
            )}

            {children.map((category) => (
                <CategoryItem
                    key={category.name}
                    id={category._id}
                    category={category}
                    onPick={onPick}
                    isPicked={category.name === pickedCategory.name}
                    requiredCategory={required}
                    defaultCategory={defaultCategory}
                    onEditCategory={onEditCategory}
                    stillEditing={editCategoryId === category._id}
                    showCheckbox={showCheckboxes} // Pass the showCheckbox prop to CategoryItem
                />
            ))}
        </CategoriesListContainer>
    );
};
export default CategoryList;
