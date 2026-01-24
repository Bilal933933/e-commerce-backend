// categoryFactory.js
import generateSlug from "./generateSlug";

class Category {
  constructor(name, description = "", image = "") {
    this.name = name;
    this.description = description;
    this.image = image;
    this.slug = generateSlug(name);
    this.type = "category"; // تمييز النوع
  }
}

class SubCategory extends Category {
  constructor(name, description = "", image = "", parentCategory) {
    super(name, description, image);
    this.parentCategory = parentCategory; // يمكن أن يكون ID أو كائن
    this.type = "subcategory";
  }
}

class CategoryFactory {
  static createCategory(name, description = "", image = "") {
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("اسم التصنيف مطلوب");
    }
    return new Category(name.trim(), description, image);
  }

  static createSubCategory(name, parentCategory, description = "", image = "") {
    if (!name || !parentCategory) {
      throw new Error("اسم التصنيف وتصنيف الأب مطلوبان");
    }
    return new SubCategory(name.trim(), description, image, parentCategory);
  }
}

// إذا كنت ستحتاج استخدام الفئات مباشرة في مكان آخر
export { Category, SubCategory };
export default CategoryFactory;