import AppError from "@shared/error/AppError"

import FakesUserRepository from "../repositories/fakes/FakesUserRepository"
import CreateUsersService from "./CreateUserService"

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const createUser = new CreateUsersService(fakeUsersRepository)

    const user = await createUser.execute({
      name: "John Doe",
      email: "jonh@example.com",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
  })

  it("should be not create two users with same email", async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const createUser = new CreateUsersService(fakeUsersRepository)

    const user = await createUser.execute({
      name: "John Doe",
      email: "jonh@example.com",
      password: "123456",
    })

    expect(
      createUser.execute({
        name: "John Doe",
        email: "jonh@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError)

    return user
  })
})
