import { startOfHour } from "date-fns"

import AppError from "@shared/error/AppError"

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError("Horario de agendamento está indisponível", 401)
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
