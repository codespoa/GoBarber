import { Router } from "express";
import { getRepository } from "typeorm";
import multer from "multer";

import CreateUserService from "./../services/CreateUserService";
import UpdateUserAvatarService from "../../modules/users/services/UpdateUserAvatarService";

import ensureAuthenticad from "../middlewares/ensureAuthenticad";
import user from "../../modules/users/entities/User";
import uploadConfig from "../../config/upload";s

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get("/", async (request, response) => {
  const users = getRepository(user);
  const allUsers = await users.find();

  return response.json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name: name,
    email: email,
    password: password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticad,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
