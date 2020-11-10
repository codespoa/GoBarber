import AppError from "@shared/error/AppError"
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"

interface RequestDTO {
  id: string;
}

class DeleteAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ id }: RequestDTO): Promise<Appointment> {
    const findAppointment = await this.appointmentsRepository.findById(id)

    if (!findAppointment) throw new AppError("Appointment not found", 404)

    const appointment = await this.appointmentsRepository.remove(id)

    return appointment

  }
}

export default DeleteAppointmentService
