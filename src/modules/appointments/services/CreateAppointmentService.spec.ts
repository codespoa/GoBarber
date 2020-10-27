import FakeAppoinmentsRepository from "../repositories/fakes/FakeAppoinmentsRepository"
import CreateAppointmentService from "./CreateAppointmentService"

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

  // it("should be abl not to create two appointment in same time", () => {
  //   expect(1 + 2).toBe(3);
  // })
})
