class APIFeatures {
    constructor(query, queryString) {
        this.query = query;                 // Mongoose Query
        this.queryString = queryString || {}; // req.query أو كائن فارغ
    }

    // 🔹 الفلترة المتقدمة
    filter() {
        const queryObj = { ...this.queryString };

        // إزالة الحقول غير الخاصة بالفلترة
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludedFields.forEach(field => delete queryObj[field]);

        // Advanced filtering (gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // 🔹 البحث في حقل محدد (افتراضي name)
    search(fieldName = 'name') {
        if (this.queryString.keyword) {
            this.query = this.query.find({
                [fieldName]: { $regex: this.queryString.keyword, $options: 'i' }
            });
        }
        return this;
    }

    // 🔹 الفرز
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sorting
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    // 🔹 Pagination
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    // 🔹 اختيار الحقول المعروضة (optional)
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); // استبعاد __v بشكل افتراضي
        }
        return this;
    }
}

export default APIFeatures;
