import httpStatus from 'http-status';

import Validation from './categories.validation';

import CategoriesService from './categories.service';

const CategoriesController = {};

const categoryResponse = (res, message, category) => {
  return res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message,
    category: {
      cId: category.cId,
      name: category.name,
      type: category.type,
    },
  });
};

/**
 * Returns Category when succesfully add
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
CategoriesController.add = async (req, res) => {
  const { err, value } = await Validation.add(req);
  if (err) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid parameters', err });
  }
  try {
    const category = await CategoriesService.createCategory(value);

    if (category) {
      categoryResponse(res, 'category is successfully added', category);
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({ statusCode: 400, success: false, message: 'category not add' });
    }
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

/**
 * Returns Category
 * @param req
 * @param res
 * @returns {*}
 */

CategoriesController.getCategory = async (req, res, next) => {
  try {
    const { cId } = req.params;

    const category = await CategoriesService.fetchCategory({ cId });

    if (category) {
      categoryResponse(res, '', category);
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ statusCode: 400, success: false, message: 'category not exists' });
    }
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, success: false, err });
  }
};
/**
 * Returns Category when edit
 * @param req
 * @param res
 * @returns {*}
 */

CategoriesController.edit = async (req, res) => {
  const { err, value } = await Validation.edit(req);
  if (err) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid parameters', err });
  }
  try {
    const { cId } = req.params;
    let { type, name } = value;
    const category = await CategoriesService.fetchCategory({ cId });

    if (type === undefined || type === null || type === '') {
      type = category.type;
    }
    if (name === undefined || name === null || name === '') {
      name = category.name;
    }
    const updateCategory = await CategoriesService.editCategory({ cId }, { type, name });

    if (updateCategory) {
      categoryResponse(res, 'category is successfully edit', updateCategory);
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({ statusCode: 400, success: false, message: 'category not edit' });
    }
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, success: false, err });
  }
};

/**
 * Returns true when delete category
 * @param req
 * @param res
 * @returns {*}
 */

CategoriesController.delete = async (req, res, next) => {
  try {
    const { cId } = req.params;

    const category = await CategoriesService.deleteCategory({ cId });
    console.log('category', category);

    if (category) {
      return res.status(httpStatus.OK).json({
        statusCode: 200,
        success: true,
        message: 'category is successfully delete',
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({ statusCode: 400, success: false, message: 'category not edit' });
    }
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, success: false, err });
  }
};

/**
 * Returns Categories
 * @param req
 * @param res
 * @returns {*}
 */

CategoriesController.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoriesService.fetchCategories();

    if (categories) {
      return res.status(httpStatus.OK).json({
        statusCode: 200,
        success: true,
        categories,
      });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ statusCode: 400, success: false, message: 'category not exists' });
    }
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, success: false, err });
  }
};

export default CategoriesController;
