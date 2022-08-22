import { Router } from "express";

import authRoutes from "./auth/auth.routes";
import categoriesRouters from "./categories/categories.routes";
import carsRouters from "./cars/cars.routes";

export default (config, db) => {
  const router = Router();

  router.use("/auth", authRoutes({ config, db }));

  router.use("/categories", categoriesRouters({ config, db }));

  router.use("/cars", carsRouters({ config, db }));

  router.get("/", (req, res) => {
    res.status(404).json("Not Found");
  });

  return router;
};
