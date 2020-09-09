import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'

import routes from "./shared/routes/index";
import "./shared/database";

import configFiles from "./config/upload";
import AppError from "./shared/error/AppError";

const app = express();

app.use(express.json());
app.use("/files", express.static(configFiles.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.errorCode).json({
      status: "error",
      message: err.errorMessage,
    });
  }

  return response.status(500).json({
    status: "error",
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log("Rodando");
});
