import { Router } from "express";
import CarsController from "./cars.controller";

import { authenticate } from "../middleware";

export default (config, db) => {
  const router = Router();

  router
    .route("/add")
    /** POST /api/v1/categories/add - add new category */
    .post(authenticate, CarsController.add);

  router
    .route("/:carId")
    /** GET /api/v1/categories/:cId - get category  */
    .get(authenticate, CarsController.getCar)
    /** PUT /api/v1/categories/:cId - edit category  */
    .put(authenticate, CarsController.edit)
    /** DELETE /api/v1/categories/:cId - delete category  */
    .delete(authenticate, CarsController.delete);

  router
    .route("/:categoryId/cars")
    /** GET /api/v1/categories/:cId - get category  */
    .get(authenticate, CarsController.getCategoryCars);

  /** GET /api/v1/categories/ - Categories Not Found API routes. */
  router.get("/", (req, res, next) => {
    res.status(404).json("Not Found");
  });

  return router;
};
