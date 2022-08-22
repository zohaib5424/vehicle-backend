import Car from "./cars";

const CarsService = {};

CarsService.fetchCategoryCars = async (query) => {
  const car = await Car.find(query);

  return car;
};

CarsService.fetchCar = async (query) => {
  const car = await Car.findOne(query);
  return car;
};

CarsService.createCar = async (query) => {
  const car = await Car.create(query);
  return car;
};

CarsService.editCar = async (condition, update) => {
  const car = await Car.findOneAndUpdate(condition, update, { new: true });
  return car;
};

CarsService.deleteCar = async (condition) => {
  const car = await Car.deleteOne(condition);
  return car;
};

CarsService.editableData = async (car, value) => {
  let { make, model, color, price, registration } = value;

  if (make === undefined || make === null || make === "") {
    make = car.make;
  }
  if (model === undefined || model === null || model === "") {
    model = car.model;
  }
  if (color === undefined || color === null || color === "") {
    color = car.color;
  }
  if (price === undefined || price === null || price === "") {
    price = car.price;
  }
  if (
    registration === undefined ||
    registration === null ||
    registration === ""
  ) {
    registration = car.registration;
  }
  return { make, model, color, price, registration };
};

export default CarsService;
