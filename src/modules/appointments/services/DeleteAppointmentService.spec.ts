import FakeAppoinmentsRepository from "../repositories/fakes/FakeAppoinmentsRepository"
import DeleteAppointmentService from "./DeleteAppointmentService"

import AppError from "@shared/error/AppError"

describe("DeleteAppointment", () => {
  it("should delete an appoinment", async () => {
    const fakeAppoinmentsRepository = new FakeAppoinmentsRepository()
    const deleteAppointment = new DeleteAppointmentService(
      fakeAppoinmentsRepository
    )

    const appointment = await deleteAppointment.execute({
      id: '12344556',
    })


    expect(appointment).toHaveProperty("id")

    expect(1 + 2).toBe(3)
  })
})
