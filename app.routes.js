import { Router } from "express";
import apiRouter from "./src/api/index";

export default (config, db) => {
  const api = Router();

  api.use("/api", apiRouter({ config, db }));

  /** GET /health-check - Check service health */
  api.get("/health-check", (req, res) => res.send("OK"));

  return api;
};
