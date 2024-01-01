import React from "react";
import { CategoryItemElement, CategoryItemElementContainer, CategoryItemShortTitle } from "./CategoryElements";

const CategoryItem = ({ category, onPick, isPicked }) => {
    return (
        <CategoryItemElementContainer>
            <CategoryItemElement onClick={() => onPick(category)} isPicked={isPicked}>
                <CategoryItemShortTitle>{category.name.slice(0, 23)}</CategoryItemShortTitle>
            </CategoryItemElement>
        </CategoryItemElementContainer>
    );
};
export default CategoryItem;
