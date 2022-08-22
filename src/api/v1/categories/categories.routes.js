import { Router } from "express";
import CategoriesController from "./categories.controller";

import { authenticate } from "../middleware";

export default (config, db) => {
  const router = Router();

  router
    .route("/")
    /** POST /api/v1/categories - all category */
    .get(authenticate, CategoriesController.getCategories);

  router
    .route("/add")
    /** POST /api/v1/categories/add - add new category */
    .post(authenticate, CategoriesController.add);

  router
    .route("/:cId")
    /** GET /api/v1/categories/:cId - get category  */
    .get(authenticate, CategoriesController.getCategory)
    /** PUT /api/v1/categories/:cId - edit category  */
    .put(authenticate, CategoriesController.edit)
    /** DELETE /api/v1/categories/:cId - delete category  */
    .delete(authenticate, CategoriesController.delete);

  /** GET /api/v1/categories/ - Categories Not Found API routes. */
  router.get("/", (req, res, next) => {
    res.status(404).json("Not Found");
  });

  return router;
};
