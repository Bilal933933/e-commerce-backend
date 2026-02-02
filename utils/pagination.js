/**
 * paginate - يُنشئ Pagination Metadata موحد مع البيانات
 *
 * @param {Array} data - القائمة المراد إرجاعها
 * @param {Number} totalItems - العدد الإجمالي للعناصر
 * @param {Object} queryParams - { page, limit }
 * @returns {Object} - الشكل الموحد للـ Response
 *
 * مثال الاستجابة:
 * {
 *   data: [...],
 *   pagination: {
 *     page: 1,
 *     limit: 10,
 *     totalItems: 57,
 *     totalPages: 6,
 *     hasNextPage: true,
 *     hasPrevPage: false
 *   }
 * }
 */
 function paginate(data, totalItems, queryParams = {}) {
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.max(Number(queryParams.limit) || 10, 1);
  const totalPages = Math.ceil(totalItems / limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
  };
}
export default paginate;