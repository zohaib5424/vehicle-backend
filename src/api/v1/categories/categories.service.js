import Categories from "./categories";

const CategoriesService = {};

CategoriesService.fetchCategory = async (query) => {
  const category = await Categories.findOne(query);
  return category;
};
CategoriesService.createCategory = async (query) => {
  const category = await Categories.create(query);
  return category;
};

CategoriesService.editCategory = async (condition, update) => {
  const category = await Categories.findOneAndUpdate(condition, update, {
    new: true,
  });
  return category;
};

CategoriesService.deleteCategory = async (condition) => {
  const category = await Categories.deleteOne(condition);
  return category;
};

CategoriesService.fetchCategories = async () => {
  const categories = await Categories.aggregate([
    {
      $lookup: {
        from: "cars",
        localField: "cId",
        foreignField: "categoryId",
        as: "categoryCars",
      },
    },
  ]);
  return categories;
};

export default CategoriesService;
