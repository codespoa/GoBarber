import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import {inject, injectable} from 'tsyringe'

import configAuth from "@config/auth"

import AppError from "@shared/error/AppError"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"

import User from "@modules/users/infra/typeorm/entities/User"

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseUser {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({ email, password }: RequestDTO): Promise<ResponseUser> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(
        "Email e/ou senha incorretos, por favor verifique seus dados",
        401
      )
    }

    const passwordMathed = await compare(password, user.password)
    if (!passwordMathed) {
      throw new AppError(
        "Email e/ou senha incorretos, por favor verifique seus dados",
        401
      )
    }

    const { secret, expiresIn } = configAuth.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
