import React from "react";
import { CategoryItemElement, CategoryItemElementContainer, CategoryItemShortTitle } from "./CategoryElements";

const CategoryItem = ({ name, onPick, isPicked }) => {
    return (
        <CategoryItemElementContainer>
            <CategoryItemElement onClick={() => onPick(name)} isPicked={isPicked}>
                <CategoryItemShortTitle>{name.slice(0, 23)}</CategoryItemShortTitle>
            </CategoryItemElement>
        </CategoryItemElementContainer>
    );
};
export default CategoryItem;
