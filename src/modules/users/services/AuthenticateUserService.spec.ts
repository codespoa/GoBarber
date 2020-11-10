import AppError from "@shared/error/AppError"

import FakesUserRepository from "../repositories/fakes/FakesUserRepository"
import AuthenticateUserService from "./AuthenticateUserService"

describe("AuthenticateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersRepository = new FakesUserRepository()
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)

    const response = await authenticateUser.execute({
      email: "jonh@example.com",
      password: "123456",
    })

    expect(response).toHaveProperty("id")
  })
})
