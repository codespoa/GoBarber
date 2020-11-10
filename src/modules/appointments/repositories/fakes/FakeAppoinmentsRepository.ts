import { v4 as uuidv4 } from "uuid"
import { isEqual } from "date-fns"

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDTO"

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"

class FakeAppoinmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { date, provider_id, id: uuidv4() })

    this.appointments.push(appointment)

    return appointment
  }

  public async remove(id: string): Promise<any | undefined> {
    const appointment = this.appointments.find((appointment) => appointment.id === id)
    console.log(appointment)
    return appointment
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      (appointment) => appointment.id === id
    )

    return findAppointment || undefined
  }
}

export default FakeAppoinmentsRepository
