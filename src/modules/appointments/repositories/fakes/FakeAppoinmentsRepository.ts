import { uuid } from "uuidv4";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDTO";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class FakeAppoinmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) => {
      appointment.date === date;
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { date, provider_id, id: uuid() });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppoinmentsRepository
