import { Router } from "express"
import multer from "multer"

import ensureAuthenticad from "../middleware/ensureAuthenticad"
import uploadConfig from "@config/upload"

const usersRouter = Router()
const upload = multer(uploadConfig)

import UsersController from "../controllers/UsersController"
const usersController = new UsersController()

import UsersAvatarController from "../controllers/UsersAvatarController"
const usersAvatarController = new UsersAvatarController()

usersRouter.get("/", usersController.index)

usersRouter.post("/", usersController.create)

usersRouter.patch(
  "/avatar",
  ensureAuthenticad,
  upload.single("avatar"),
  usersAvatarController.update
)

export default usersRouter
