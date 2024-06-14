import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

import {
    CategoriesSidebarContainer,
    CategoriesSidebarHeader,
    CategoriesSidebarHeaderTitle,
    CategoryCreateContainer,
    DeleteCategoryContainer,
    DeleteCategorySpan,
    FunctionalityContainer,
    MultiSelectContainer,
    ToggleButton,
} from "./CategoryElements";

import CategoryList from "./CategoryList";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import ModifyCategory from "./ModifyCategory";
import { createNotesCategory, deleteNotesCategory } from "src/features/notes/notesCategory/notesCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CategorySidebar = ({
    pickedCategory,
    onPick,
    onUnpickNote,
    setCopyCategoryOptionMode,
    categories,
    isCategoryLoading,
    defaultCategory,
}) => {
    const dispatch = useDispatch();
    const [modalOpenMode, setModalOpenMode] = useState(false);
    const [categoryOptionMode, setCategoryOptionMode] = useState(false);
    const [editCategory, setEditCategory] = useState("");
    const [showDeleteAll, setShowDeleteAll] = useState(false);

    useEffect(() => {
        if (!categories.length && categoryOptionMode) handleCloseOptionsMode();
    }, [categories]);

    useEffect(() => {
        setCopyCategoryOptionMode(categoryOptionMode);
    }, [categoryOptionMode]);

    const handleCreateCategory = () => {
        setModalOpenMode(true);
        onUnpickNote();
    };

    const handleCloseModal = () => {
        setModalOpenMode(false);
    };

    const handleSave = (categoryName) => {
        if (categoryName === defaultCategory.name) {
            toast.error(`You can't use ${defaultCategory.name} as category name`);
            return;
        }
        dispatch(createNotesCategory({ name: categoryName }));
        handleCloseModal();
    };

    const handleCloseOptionsMode = () => {
        setCategoryOptionMode(false);
        handleCloseModal();
        onPick({});
    };

    const { selectedCategories } = useSelector((state) => state.notesCategories);

    const deleteAllCategories = () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all selected categories?");
        if (userConfirmed) {
            selectedCategories.map((category) => dispatch(deleteNotesCategory(category)));
        }
    };

    return (
        <CategoriesSidebarContainer>
            <CategoriesSidebarHeader>
                <RxHamburgerMenu className="icon" size="20px" title="Menu" />
                <CategoriesSidebarHeaderTitle>Notes</CategoriesSidebarHeaderTitle>
                <MdCreateNewFolder
                    className="icon icon-add"
                    size="20px"
                    title="New Category"
                    onClick={
                        editCategory
                            ? () => {
                                  handleCreateCategory();
                                  setEditCategory("");
                              }
                            : handleCreateCategory
                    }
                />
            </CategoriesSidebarHeader>
            {isCategoryLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CategoryList
                        required
                        onPick={onPick}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                    >
                        {[defaultCategory]}
                    </CategoryList>
                    <CategoryList
                        addMode={modalOpenMode}
                        onPick={!showDeleteAll ? onPick : {}}
                        pickedCategory={pickedCategory}
                        defaultCategory={defaultCategory}
                        onEditCategory={setEditCategory}
                        editCategoryId={editCategory}
                        showCheckboxes={showDeleteAll}
                    >
                        {categories}
                    </CategoryList>
                    {modalOpenMode && (
                        <CategoryCreateContainer>
                            <ModifyCategory onSave={handleSave} onCancel={handleCloseModal} editCategoryName="" />
                        </CategoryCreateContainer>
                    )}
                </>
            )}
            <FunctionalityContainer>
                <MultiSelectContainer $showDeleteAll={showDeleteAll} onClick={() => setShowDeleteAll(!showDeleteAll)}>
                    {showDeleteAll ? <FaToggleOn /> : <FaToggleOff />}
                    <ToggleButton $showDeleteAll={showDeleteAll}>Multi Select</ToggleButton>
                </MultiSelectContainer>
                {showDeleteAll && selectedCategories.length > 0 && (
                    <DeleteCategoryContainer onClick={deleteAllCategories}>
                        <BiTrash size="25px" fill="red" />
                        <DeleteCategorySpan>Delete All</DeleteCategorySpan>
                    </DeleteCategoryContainer>
                )}
            </FunctionalityContainer>
        </CategoriesSidebarContainer>
    );
};

export default CategorySidebar;
