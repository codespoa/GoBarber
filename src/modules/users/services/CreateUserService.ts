import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "@shared/error/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository"

import User from "@modules/users/infra/typeorm/entities/User";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Esse usuário já está em uso!", 400);
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name: name,
      email: email,
      password: passwordHashed,
    });
    return user;
  }
}

export default CreateUserService;
