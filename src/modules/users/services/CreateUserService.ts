import { hash } from "bcryptjs"
import {inject, injectable} from 'tsyringe'

import AppError from "@shared/error/AppError"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"

import User from "@modules/users/infra/typeorm/entities/User"

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({ name, email, password }: RequestDTO): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Esse usuário já está em uso!", 401)
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.usersRepository.create({
      name: name,
      email: email,
      password: passwordHashed,
    })
    return user
  }
}

export default CreateUserService
