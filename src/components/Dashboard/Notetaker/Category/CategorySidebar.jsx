import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCreateNewFolder } from "react-icons/md";

import { CategoriesSidebarContainer, CategoriesSidebarHeader, CategoriesSidebarHeaderTitle } from "./CategoryElements";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../../../Other/MixComponents/Spinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import ModifyCategory from "./ModifyCategory";
import { createCategory, editCategory } from "../../../../features/notes/category/categorySlice";

const CategorySidebar = ({ pickedCategory, onPick }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const [nonRequiredCategories, setNonRequiredCategories] = useState([]);
    const [requiredCategories, setRequiredCategories] = useState([]);
    const [modalOpenMode, setModalOpenMode] = useState("");
    const isCategoryLoading = false;

    useEffect(() => {
        setNonRequiredCategories(categories.filter((item) => !item.required));
        setRequiredCategories(categories.filter((item) => item.required));
    }, [categories]);

    const handleCreateCategory = () => {
        setModalOpenMode("Create");
    };
    const handleCloseModal = () => {
        setModalOpenMode("");
    };
    const handleSave = (categoryName) => {
        if (modalOpenMode === "Create") {
            dispatch(createCategory(categoryName));
        } else {
            dispatch(editCategory(categoryName));
        }
        handleCloseModal();
    };
    return (
        <CategoriesSidebarContainer>
            <CategoriesSidebarHeader>
                <RxHamburgerMenu className="icon" size="24px" title="Menu" />
                <CategoriesSidebarHeaderTitle>Notes</CategoriesSidebarHeaderTitle>
                <MdCreateNewFolder
                    className="icon icon-add"
                    size="20px"
                    title="New Category"
                    onClick={handleCreateCategory}
                />
            </CategoriesSidebarHeader>
            {modalOpenMode ? (
                <ModifyCategory onSave={handleSave} onCancel={handleCloseModal} />
            ) : isCategoryLoading ? (
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
