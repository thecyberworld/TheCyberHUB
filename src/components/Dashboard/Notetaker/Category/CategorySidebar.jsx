import React, { useEffect, useState } from "react";
import { MdCreateNewFolder, MdOutlineCancel } from "react-icons/md";
import { LuFolderCog } from "react-icons/lu";
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
import { updateCategory, deleteCategory, createCategory } from "../../../../features/notes/category/categorySlice";
import { useDispatch } from "react-redux";

const CategorySidebar = ({
    pickedCategory,
    onPick,
    onUnpickNote,
    requiredCategories,
    setCopyCategoryOptionMode,
    categories,
    isCategoryLoading,
    setPickedCategory,
}) => {
    const dispatch = useDispatch();
    const [modalOpenMode, setModalOpenMode] = useState("");
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);

    useEffect(() => {
        if (!categories.length && categoryOptionMode) handleCloseOptionsMode();
    }, [categories]);

    useEffect(() => {
        setCopyCategoryOptionMode(categoryOptionMode);
    }, [categoryOptionMode]);
    const handleCreateCategory = () => {
        setModalOpenMode("Create");
        onUnpickNote();
    };

    const handleCloseModal = () => {
        setModalOpenMode("");
    };
    const handleSave = (categoryName) => {
        if (modalOpenMode === "Create") {
            dispatch(createCategory({ name: categoryName }));
        } else {
            dispatch(updateCategory({ id: pickedCategory._id, categoryData: { name: categoryName } }));
            onPick({});
        }
        handleCloseModal();
    };
    const handleOpenOptionsMode = () => {
        if (categories.length === 0) {
            toast.error(
                `Options Mode Is Only For Unique Categories Modification. 
                First Add At Least One Unique Category And Click Again`,
            );
            return;
        }
        setCategoryOptionMode(true);
        onUnpickNote();
        onPick(categories[0]);
    };
    const handleCloseOptionsMode = () => {
        setCategoryOptionMode(false);
        handleCloseModal();
        onPick(requiredCategories[0]);
    };
    const handleEditCategory = () => {
        if (Object.keys(pickedCategory).length === 0) {
            toast.error("Need to pick a category to edit it");
            return;
        }
        setModalOpenMode("Edit");
    };

    const handleDeleteCategory = () => {
        if (Object.keys(pickedCategory).length === 0) {
            toast.error("Need to pick a category to delete it");
            return;
        }
        dispatch(deleteCategory(pickedCategory._id)).then(() => {
            setPickedCategory({});
        });
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
                        {categories}
                    </CategoryList>
                </>
            )}
        </CategoriesSidebarContainer>
    );
};
export default CategorySidebar;
