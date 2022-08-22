import { Router } from "express";
import AuthController from "./auth.controller";

import { authenticate } from "../middleware";

export default (config, db) => {
  const router = Router();

  router
    .route("/signIn")
    /** POST /api/v1/auth/signIn - Login user */
    .post(
      AuthController.signIn,
      AuthController.attachTokens,
      AuthController.loginRespond
    );

  router
    .route("/logout")
    /** GET /api/v1/auth/logout - Logout user */
    .post(authenticate, AuthController.logout);

  router
    .route("/signup")
    /** POST /api/v1/auth/signup - Signup new user */
    .post(AuthController.signup);

  /** GET /api/v1/auth/ - Auth Not Found API routes. */
  router.get("/", (req, res, next) => {
    res.status(404).json("Not Found");
  });

  return router;
};
