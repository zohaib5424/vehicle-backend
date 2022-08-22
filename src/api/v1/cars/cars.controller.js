import httpStatus from "http-status";

import Validation from "./cars.validation";
import CarsService from "./cars.service";
import CategoriesService from "../categories/categories.service";

const CarsController = {};

const carResponse = (res, message, car) => {
  return res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message,
    car: {
      carId: car.carId,
      model: car.model,
      color: car.color,
      make: car.make,
      price: car.price,
      type: car.type,
      registration: car.registration,
      categoryId: car.categoryId,
    },
  });
};

/**
 * Returns Car when succesfully add
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
CarsController.add = async (req, res) => {
  const { err, value } = await Validation.add(req);
  if (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid parameters", err });
  }
  try {
    const { categoryName, make, model, color, price, registration } = value;

    const category = await CategoriesService.fetchCategory({
      name: categoryName,
    });
    if (!category) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "category not exists",
      });
    }
    const car = await CarsService.createCar({
      make,
      model,
      color,
      price,
      registration,
      categoryId: category.cId,
    });

    if (car) {
      carResponse(res, "car is successfully added", car);
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ statusCode: 400, success: false, message: "category not add" });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

/**
 * Returns Car
 * @param req
 * @param res
 * @returns {*}
 */

CarsController.getCar = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const car = await CarsService.fetchCar({ carId });

    if (car) {
      carResponse(res, "", car);
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "category not exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, success: false, err });
  }
};

/**
 * Returns Category Cars
 * @param req
 * @param res
 * @returns {*}
 */

CarsController.getCategoryCars = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const cars = await CarsService.fetchCategoryCars({ categoryId });

    if (cars) {
      return res.status(httpStatus.OK).json({
        statusCode: 200,
        success: true,
        cars,
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "category not exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, success: false, err });
  }
};

/**
 * Returns Car when edit
 * @param req
 * @param res
 * @returns {*}
 */

CarsController.edit = async (req, res) => {
  const { err, value } = await Validation.edit(req);
  if (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid parameters", err });
  }
  try {
    const { carId } = req.params;

    const car = await CarsService.fetchCar({ carId });

    const editable = await CarsService.editableData(car, value);
    const updateCar = await CarsService.editCar({ carId }, editable);

    if (updateCar) {
      carResponse(res, "car is successfully edit", updateCar);
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "category not edit",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, success: false, err });
  }
};

/**
 * Returns true when delete car
 * @param req
 * @param res
 * @returns {*}
 */

CarsController.delete = async (req, res, next) => {
  try {
    const { carId } = req.params;

    const car = await CarsService.deleteCar({ carId });
    console.log("car", car);

    if (car) {
      return res.status(httpStatus.OK).json({
        statusCode: 200,
        success: true,
        message: "car is successfully delete",
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "category not edit",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, success: false, err });
  }
};

export default CarsController;
