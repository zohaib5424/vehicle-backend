import jwt from "jsonwebtoken";

import config from "../../config/env";

const TOKENTIME = 60 * 60 * 24 * 30 * 12; // 1 year

const SECRET = config.jwtSecret;

export const generateAccessToken = (values) => {
  return jwt.sign(values, SECRET, {
    expiresIn: TOKENTIME,
  });
};

export const authenticate = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(404).json({
      message: "No such user exists!",
      statusCode: 404,
      success: false,
    });
  }
  return next();
};
