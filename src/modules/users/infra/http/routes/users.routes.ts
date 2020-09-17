import { Router } from "express";
import { getRepository } from "typeorm";
import multer from "multer";

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

import ensureAuthenticad from "../middleware/ensureAuthenticad";
import user from "../../typeorm/entities/User";
import uploadConfig from "@config/upload";

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get("/", async (request, response) => {
  const usersRepository = new UsersRepository();

  const users = getRepository(user);
  const allUsers = await users.find();

  return response.json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const usersRepository = new UsersRepository();
  const { name, email, password } = request.body;

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name: name,
    email: email,
    password: password,
  });

  // delete user.password;

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticad,
  upload.single("avatar"),
  async (request, response) => {
    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    // delete user.password;

    return response.json(user);
  }
);

export default usersRouter;
