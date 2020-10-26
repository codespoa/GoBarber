import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDTO";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []
  public async findByDate(date: Date): Promise<Appointment | undefined> {}

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {}
}

export default AppointmentsRepository;
