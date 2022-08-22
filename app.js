import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dbConnection from "./src/db/db";
import config from "./src/config/env";
import routes from "./app.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

dbConnection((dbError, db) => {
  if (dbError) {
    throw dbError;
  }
  // mount all routes
  app.use("/", routes({ config, db }));
});

export default app;
