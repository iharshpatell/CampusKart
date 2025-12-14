import { Router } from "express";
import auth from "../middleware/auth.js";
import { 
    createProductController, 
    deleteProductDetails, 
    getProductByCategory, 
    getProductByCategoryAndSubCategory, 
    getProductController, 
    getProductDetails, 
    searchProduct, 
    updateProductDetails 
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/create", auth, createProductController);  // ❌ Removed admin
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post("/get-product-by-category-and-subcategory", getProductByCategoryAndSubCategory);
productRouter.post("/get-product-details", getProductDetails);

// Update product
productRouter.put("/update-product-details", auth, updateProductDetails);  // ❌ Removed admin

// Delete product
productRouter.delete("/delete-product", auth, deleteProductDetails);  // ❌ Removed admin

// Search product
productRouter.post("/search-product", searchProduct);

export default productRouter;
