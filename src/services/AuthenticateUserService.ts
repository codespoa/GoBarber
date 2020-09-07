import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

import configAuth from '../config/auth'
import User from "../models/User";

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseUser {
  user: User;
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseUser> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new Error(
        "Email e/ou senha incorretos, por favor verifique seus dados"
      );
    }

    const passwordMathed = await compare(password, user.password);
    if (!passwordMathed) {
      throw new Error(
        "Email e/ou senha incorretos, por favor verifique seus dados"
      );
    }

    const { secret, expiresIn } = configAuth.jwt

    const token = sign({}, secret, {
        subject: user.id,
        expiresIn
    })

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
