import { Request, Response } from "express"
import { parseISO } from "date-fns"
import { container } from "tsyringe"

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"
import DeleteAppointmentService from "@modules/appointments/services/DeleteAppointmentService"

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentService)
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    return response.json(appointment)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteAppointment = container.resolve(DeleteAppointmentService)
    await deleteAppointment.execute({ id })

    return response.json({
      error: false,
      message: "Appointment deleted successfully",
    })

    // const appointment = await
  }
}
