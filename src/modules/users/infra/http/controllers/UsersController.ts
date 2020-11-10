import { Request, Response } from "express"
import { getRepository } from "typeorm"
import User from "../../typeorm/entities/User"


import CreateUserService from "@modules/users/services/CreateUserService"
import {container} from 'tsyringe'


export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name: name,
      email: email,
      password: password,
    })

    delete user.password

    return response.json(user)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const users = getRepository(User)
    const allUsers = await users.find()
  
    return response.json(allUsers)
  }
}
