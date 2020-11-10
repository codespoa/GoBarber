import FakeAppoinmentsRepository from "../repositories/fakes/FakeAppoinmentsRepository"
import CreateAppointmentService from "./CreateAppointmentService"
import AppError from "@shared/error/AppError"

describe("CreateAppointment", () => {
  it("should be able to create a new appointment", async () => {
    const fakeAppoinmentsRepository = new FakeAppoinmentsRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppoinmentsRepository
    )

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "12344556",
    })

    expect(appointment).toHaveProperty("id")
    expect(appointment.provider_id).toBe("12344556")
  })

  it("should be able not to create two appointment in same time", async () => {
    const fakeAppoinmentsRepository = new FakeAppoinmentsRepository()
    const createAppointment = new CreateAppointmentService(
      fakeAppoinmentsRepository
    )

    const appointmentDate = new Date(2020, 1, 1, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "12344556",
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "12344556",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
