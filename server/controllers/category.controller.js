import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

// Add Category (Any logged-in user can add)
export const AddCategoryController = async (request, response) => {
    try {
        const { name, image } = request.body;

        if (!name || !image) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        if (!request.user) {
            return response.status(401).json({
                message: "User not found. Please log in again.",
                error: true,
                success: false
            });
        }

        const addCategory = new CategoryModel({
            name,
            image,
            createdBy: request.user._id  // Corrected user reference
        });

        const saveCategory = await addCategory.save();

        return response.json({
            message: "Category Added",
            data: saveCategory,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


// Get All Categories (Anyone can view)
export const getCategoryController = async (request, response) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt: -1 });

        return response.json({
            data: data,
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Update Category (Only the user who created it can update)
export const updateCategoryController = async (request, response) => {
    try {
        const { _id, name, image } = request.body;
        const userId = request.user._id;

        // Find the category and check ownership
        const category = await CategoryModel.findById(_id);
        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            });
        }

        if (category.createdBy.toString() !== userId) {
            return response.status(403).json({
                message: "You are not authorized to update this category",
                error: true,
                success: false
            });
        }

        const update = await CategoryModel.updateOne(
            { _id: _id },
            { name, image }
        );

        return response.json({
            message: "Category Updated",
            success: true,
            error: false,
            data: update
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Delete Category (Only the user who created it can delete)
export const deleteCategoryController = async (request, response) => {
    try {
        const { _id } = request.body;
        const userId = request.user._id;

        // Find the category and check ownership
        const category = await CategoryModel.findById(_id);
        if (!category) {
            return response.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            });
        }

        if (category.createdBy.toString() !== userId) {
            return response.status(403).json({
                message: "You are not authorized to delete this category",
                error: true,
                success: false
            });
        }

        // Check if category is being used in subcategories or products
        const checkSubCategory = await SubCategoryModel.find({ category: _id }).countDocuments();
        const checkProduct = await ProductModel.find({ category: _id }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return response.status(400).json({
                message: "Category is in use, cannot delete",
                error: true,
                success: false
            });
        }

        await CategoryModel.deleteOne({ _id });

        return response.json({
            message: "Category Deleted Successfully",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
};
