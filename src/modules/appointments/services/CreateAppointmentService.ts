import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from "@shared/error/AppError";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("Horario de agendamento está indisponível", 400);
    }

    const appointment = await appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
