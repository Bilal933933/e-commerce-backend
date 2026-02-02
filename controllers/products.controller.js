import ProductsService from "../services/products.service.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { BaseController } from "../utils/baseController.js";


class ProductsController extends BaseController {
  constructor(service = ProductsService) {
    super(service);
  }
    
  createProduct = asyncHandler(async (req, res) => {
       const { name, price, description, categoryId, image } = req.body;
    const product = await ProductsService.createProduct({
        name,
        price,
        description,
        categoryId,
        image,
    });
    this.logAction("إنشاء منتج", `المستخدم: ${req.user.id}`);
    this.send(res, product, "تم تسجيل المنتج بنجاح", 201);
  });

  getAllProducts = asyncHandler(async (req, res) => {
    const data = await this.service.getAllProducts(req.query);
    this.logAction("جلب جميع المنتجات", `الاستعلام: ${JSON.stringify(req.query)}`);
    this.send(res, data, "تم جلب جميع المنتجات بنجاح", 200);
  });

  getProduct = asyncHandler(async (req, res) => {
    const data = await this.service.getProduct(req.params.id);
    this.logAction("جلب المنتج", req.params.id);
    this.send(res, data, "تم جلب المنتج بنجاح", 200);
  });

  getProductsByCategory = asyncHandler(async (req, res) => {
    const data = await this.service.getProductsByCategory(req.params.id, req.query);
    this.logAction("جلب المنتجات حسب الفئة", `الاستعلام: ${JSON.stringify(req.query)}`);
    this.send(res, data, "تم جلب المنتجات بنجاح", 200);
  });

  updateProduct = asyncHandler(async (req, res) => {
    const data = await this.service.updateProduct(req.body, req.params.id);
    this.logAction("تحديث المنتج", `المعرف: ${req.params.id}`);
    this.send(res, data, "تم تحديث المنتج بنجاح", 200);
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const data = await this.service.deleteProduct(req.params.id);
    this.logAction("حذف المنتج", `المعرف: ${req.params.id}`);
    this.send(res, data, "تم حذف المنتج بنجاح", 200);
  });

}

export default new ProductsController();