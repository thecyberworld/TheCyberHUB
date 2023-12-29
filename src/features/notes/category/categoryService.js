import axios from "axios";
import { getApiUrl } from "../../apiUrl";

const API_URL = getApiUrl("api/category/");

// Create new category
const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, categoryData, config);

    return response.data;
};

// Update category
const updateCategory = async (id, categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, categoryData, config);

    return response.data;
};

// Get user categories
const getCategories = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete user category
const deleteCategory = async (categoryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + categoryId, config);
    return response.data;
};

const categoryService = {
    createCategory,
    updateCategory,
    getCategories,
    deleteCategory,
};

export default categoryService;
