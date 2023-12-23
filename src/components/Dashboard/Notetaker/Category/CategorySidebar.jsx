import React, { useEffect, useState } from "react";
import { MdCreateNewFolder, MdOutlineCancel } from "react-icons/md";
import { LuFolderCog } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TbEditCircle } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";

import {
    CategoriesOptionsModeButtons,
    CategoriesOptionsModeTitle,
    CategoriesSidebarContainer,
    CategoriesSidebarHeader,
    CategoriesSidebarHeaderTitle,
} from "./CategoryElements";
import CategoryList from "./CategoryList";
import LoadingSpinner from "../../../Other/MixComponents/Spinner/LoadingSpinner";
import ModifyCategory from "./ModifyCategory";
import { createCategory, editCategory, removeCategory } from "../../../../features/notes/category/categorySlice";

const CategorySidebar = ({ pickedCategory, onPick, onUnpickNote, pickedNote }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const [nonRequiredCategories, setNonRequiredCategories] = useState([]);
    const [requiredCategories, setRequiredCategories] = useState([]);
    const [modalOpenMode, setModalOpenMode] = useState("");
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);
    const isCategoryLoading = false;

    useEffect(() => {
        const findNonRequiredCategories = categories.filter((item) => !item.required);
        if (!findNonRequiredCategories.length && categoryOptionMode) handleCloseOptionsMode();
        setNonRequiredCategories(() => {
            return findNonRequiredCategories;
        });
        setRequiredCategories(categories.filter((item) => item.required));
    }, [categories]);

    useEffect(() => {
        if (Object.keys(pickedNote).length !== 0) setCategoryOptionMode(false);
    }, [pickedNote]);

    const handleCreateCategory = () => {
        setModalOpenMode("Create");
        onUnpickNote();
    };
    const handleEditCategory = () => {
        if (Object.keys(pickedCategory).length === 0) {
            toast.error("Need to pick a category to edit it");
            return;
        }
        setModalOpenMode("Edit");
    };
    const handleCloseModal = () => {
        setModalOpenMode("");
    };
    const handleSave = (categoryName) => {
        if (modalOpenMode === "Create") {
            dispatch(createCategory(categoryName));
        } else {
            dispatch(editCategory({ ...pickedCategory, name: categoryName }));
            onPick({});
        }
        handleCloseModal();
    };
    const handleOpenOptionsMode = () => {
        if (nonRequiredCategories.length === 0) {
            toast.error(
                `Options Mode Is Only For Unique Categories Modification. 
                First Add At Least One Unique Category And Click Again`,
            );
            return;
        }
        setCategoryOptionMode(true);
        onUnpickNote();
        onPick(nonRequiredCategories[0]);
    };
    const handleCloseOptionsMode = () => {
        setCategoryOptionMode(false);
        handleCloseModal();
        onPick(requiredCategories[0]);
    };
    const handleDeleteCategory = () => {
        if (Object.keys(pickedCategory).length === 0) {
            toast.error("Need to pick a category to delete it");
            return;
        }
        dispatch(removeCategory(pickedCategory._id));
    };
    return (
        <CategoriesSidebarContainer>
            {categoryOptionMode ? (
                <CategoriesSidebarHeader>
                    <CategoriesOptionsModeTitle>
                        <CategoriesSidebarHeaderTitle>First Pick Category</CategoriesSidebarHeaderTitle>
                    </CategoriesOptionsModeTitle>
                    <CategoriesOptionsModeButtons>
                        <TbEditCircle
                            className="icon icon-edit"
                            size="18px"
                            title="Edit"
                            onClick={handleEditCategory}
                        />
                        <AiTwotoneDelete
                            className="icon icon-delete"
                            size="18px"
                            title="Delete"
                            onClick={handleDeleteCategory}
                        />
                        <MdOutlineCancel
                            className="icon icon-cancel"
                            size="19px"
                            title="Cancel"
                            onClick={handleCloseOptionsMode}
                        />
                    </CategoriesOptionsModeButtons>
                </CategoriesSidebarHeader>
            ) : (
                <CategoriesSidebarHeader>
                    <LuFolderCog className="icon" size="20px" title="Options" onClick={handleOpenOptionsMode} />
                    <CategoriesSidebarHeaderTitle>Notes</CategoriesSidebarHeaderTitle>
                    <MdCreateNewFolder
                        className="icon icon-add"
                        size="20px"
                        title="New Category"
                        onClick={handleCreateCategory}
                    />
                </CategoriesSidebarHeader>
            )}
            {modalOpenMode ? (
                <ModifyCategory
                    onSave={handleSave}
                    onCancel={handleCloseModal}
                    editCategoryName={modalOpenMode === "Edit" ? pickedCategory.name : ""}
                />
            ) : isCategoryLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {!categoryOptionMode && (
                        <CategoryList required onPick={onPick} pickedCategory={pickedCategory}>
                            {requiredCategories}
                        </CategoryList>
                    )}
                    <CategoryList onPick={onPick} pickedCategory={pickedCategory}>
                        {nonRequiredCategories}
                    </CategoryList>
                </>
            )}
        </CategoriesSidebarContainer>
    );
};
export default CategorySidebar;
