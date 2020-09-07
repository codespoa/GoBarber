import { Router } from "express";
import { getRepository } from "typeorm";
import multer from "multer";

import CreateUserService from "./../services/CreateUserService";
import ensureAuthenticad from "./../middlewares/ensureAuthenticad";
import user from "../models/User";
import uploadConfig from "../config/upload";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get("/", async (request, response) => {
  const users = getRepository(user);
  const allUsers = await users.find();

  return response.json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name: name,
      email: email,
      password: password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticad,
  upload.single("avatar"),
  async (request, response) => {
    return response.json({ ok: true });
  }
);

export default usersRouter;
