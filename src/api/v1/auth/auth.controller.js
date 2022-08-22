import httpStatus from "http-status";
import generator from "generate-password";

import Validation from "./auth.validation";
import User from "./user";
import AuthService from "./auth.service";
import { sendEmail } from "../helper";

import { generateAccessToken } from "../middleware";

const AuthController = {};

/**
 * Returns User when succesfully sign up
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
AuthController.signup = async (req, res, next) => {
  const { err, value } = await Validation.signup(req);
  if (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid parameters", err });
  }
  try {
    const { name, email } = value;
    const user = await AuthService.fetchUser({ email });

    if (user) {
      return res.status(409).json({ statusCode: 409, success: false });
    } else {
      let password = generator.generate({
        length: 10,
        numbers: true,
      });

      const newUser = await AuthService.createUser({ name, email, password });
      try {
        const emailRes = await sendEmail({ name, email, password });
        console.log("email", emailRes);
      } catch (error) {
        console.log("error ", error);
      }
      return res
        .status(httpStatus.OK)
        .json({ statusCode: 200, success: true, user: newUser });
    }
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

/**
 * Returns user
 * @param req
 * @param res
 * @returns {*}
 */

AuthController.signIn = async (req, res, next) => {
  const { err, value } = await Validation.signIn(req);
  if (err) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Invalid parameters", err });
  }
  try {
    const { email, password } = value;

    req.body.email = email.toLowerCase();
    const user = await AuthService.fetchUser({
      email: req.body.email,
      password,
    });

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: 400,
        success: false,
        message: "email or password incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ statusCode: 500, success: false, err });
  }
};

AuthController.attachTokens = async (req, res, next) => {
  const newToken = generateAccessToken({
    userId: req.user.userId,
    email: req.user.email,
  });
  req.accessToken = newToken;
  next();
};

/**
 * Returns User is succesfully loggedIn.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
AuthController.loginRespond = async (req, res, next) => {
  const { user } = req;
  return res.status(httpStatus.OK).json({
    statusCode: 200,
    success: true,
    message: "User is Successfully logged In",
    accessToken: req.accessToken,
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
    },
  });
};

/**
 * Returns User is succesfully loggedOut.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
AuthController.logout = async (req, res) => {
  const { user } = req;
  User.findOne(user.userId)
    .then((user) => {
      user.deviceToken = "";
      user.save((saveError, saveUser) => {
        if (saveError) {
          return res.status(400).json({
            statusCode: 400,
            success: false,
            saveError,
          });
        }
        return res.status(200).json({
          statusCode: 200,
          success: true,
          message: "Successfully logged out",
        });
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "No such user exists!",
        statusCode: 404,
        success: false,
        err,
      });
    });
};

export default AuthController;
