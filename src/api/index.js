import { Router } from "express";
import v1Routers from "./v1";

export default (config, db) => {
  const router = Router();

  router.use("/v1", v1Routers({ config, db }));

  /** GET /api/v1/auth/ - Basic Not Found API routes. */
  router.get("/", (req, res, next) => {
 
    res.status(404).json("Not Found");
  
  });

  return router;
};
