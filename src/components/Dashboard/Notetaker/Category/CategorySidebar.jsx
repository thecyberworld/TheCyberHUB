import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCreateNewFolder } from "react-icons/md";

import { CategoriesSidebarContainer, CategoriesSidebarHeader, CategoriesSidebarHeaderTitle } from "./CategoryElements";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../../../Other/MixComponents/Spinner/LoadingSpinner";

const DUMMYDATA = [
    {
        name: "Pinned Notes",
        required: true,
    },
    {
        name: "Other Notes",
        required: true,
    },
    {
        name: "Category 1",
    },
    {
        name: "Category 2",
    },

    {
        name: "Category 3",
    },
];

const CategorySidebar = ({ pickedCategory, onPick }) => {
    const [nonRequiredCategories, setNonRequiredCategories] = useState([]);
    const [requiredCategories, setRequiredCategories] = useState([]);
    const isCategoryLoading = false;

    useEffect(() => {
        setNonRequiredCategories(DUMMYDATA.filter((item) => !item.required));
        setRequiredCategories(DUMMYDATA.filter((item) => item.required));
    }, []);

    return (
        <CategoriesSidebarContainer>
            <CategoriesSidebarHeader>
                <RxHamburgerMenu className="icon" size="24px" title="Menu" />
                <CategoriesSidebarHeaderTitle>Notes</CategoriesSidebarHeaderTitle>
                <MdCreateNewFolder
                    className="icon icon-add"
                    size="20px"
                    title="New Category"
                    // onClick={handleOpenAddNewCategoryMode}
                />
            </CategoriesSidebarHeader>
            {isCategoryLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CategoryList required onPick={onPick} pickedCategory={pickedCategory}>
                        {requiredCategories}
                    </CategoryList>
                    <CategoryList onPick={onPick} pickedCategory={pickedCategory}>
                        {nonRequiredCategories}
                    </CategoryList>
                </>
            )}
        </CategoriesSidebarContainer>
    );
};
export default CategorySidebar;
