import CategoriesService from "../services/categories.service.js";
import asyncHandler from "../middleware/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import { BaseController } from "../utils/baseController.js";

 class CategoriesController extends BaseController {
    constructor(service = CategoriesService) {
        super(service);
    }
    getAllCategories = asyncHandler(async (req, res) => {
        const data = await this.service.getAllCategories(req.query);
        this.logAction("جلب جميع التصنيفات", `الاستعلام: ${JSON.stringify(req.query)}`);
        sendResponse(res, data, "تم جلب التصنيفات بنجاح", 200);
    });
    getCategoryById = asyncHandler(async (req, res) => {
        const data = await this.service.getCategoryById(req.params.id);
        this.logAction("جلب التصنيف", `المعرف: ${req.params.id}`);
        sendResponse(res, data, "تم جلب التصنيف بنجاح", 200);
    });
    createCategory = asyncHandler(async (req, res) => {
        const data = await this.service.createCategory(req.body);
        this.logAction("إنشاء تصنيف جديد", JSON.stringify(req.body));
        sendResponse(res, data, "تم إنشاء التصنيف بنجاح", 201);
    });
    updateCategory = asyncHandler(async (req, res) => {
        const data = await this.service.updateCategory(req.params.id, req.body);
        this.logAction("تحديث التصنيف", `المعرف: ${req.params.id}`);
        sendResponse(res, data, "تم تحديث التصنيف بنجاح", 200);
    });
    deleteCategory = asyncHandler(async (req, res) => {
        const data = await this.service.deleteCategory(req.params.id);
        this.logAction("حذف التصنيف", `المعرف: ${req.params.id}`);
        sendResponse(res, data, "تم حذف التصنيف بنجاح", 200);
    });
    getSubCategories = asyncHandler(async (req, res) => {
        const data = await this.service.getSubCategories(req.params.id);
        this.logAction("جلب التصنيفات الفرعية", `المعرف: ${req.params.id}`);
        sendResponse(res, data, "تم جلب التصنيفات الفرعية بنجاح", 200);
    });
        }

export default new CategoriesController();
