import ProductsService from "../services/products.service.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, categoryId, image } = req.body;
    const product = await ProductsService.createProduct({
        name,
        price,
        description,
        categoryId,
        image,
    });
    res.status(201).json({ status: "success", data: product, message: "تم تسجيل المنتج بنجاح" });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const product = await ProductsService.updateProduct( {
        name,
        price,
        description,
        categoryId,
    }, id);
    res.status(200).json({ status: "success", data: product, message: "تم تحديث المنتج بنجاح" });
})

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductsService.getAllProducts();
    res.status(200).json({ status: "success", data: products, message: "تم جلب جميع المنتجات بنجاح" });
}
);

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await ProductsService.getProduct(id);
    res.status(200).json({ status: "success", data: product, message: "تم جلب المنتج بنجاح" });
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await ProductsService.deleteProduct(id);
    res.status(200).json({ status: "success", message: "تم حذف المنتج بنجاح" });
});

export { createProduct, getAllProducts, deleteProduct, updateProduct, getProduct };