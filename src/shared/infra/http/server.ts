import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import "express-async-errors"


import uploadConfig from "@config/upload"
import AppError from "@shared/error/AppError"
import routes from "@shared/infra/http/routes/index"

import "@shared/infra/typeorm"
import '@shared/container'

const app = express()
app.use(cors())

app.use(express.json())
app.use("/files", express.static(uploadConfig.directory))
app.use(routes)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.errorCode).json({
      status: "error",
      message: err.errorMessage,
    })
  }

  return response.json({
    status: "error",
    message: err,
  })

  // return response.status(500).json({
  //   status: "error",
  //   message: "Internal server error",
  // });
})

app.listen(3333, () => {
  console.log("Rodando")
})
