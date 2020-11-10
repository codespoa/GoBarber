import { getRepository, Repository } from "typeorm"

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDTO"

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment)
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date },
    })

    return findAppointment || undefined
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async remove(id: string): Promise<any | undefined> {
    const appointment = await this.ormRepository.findOne({ where: { id: id } })

    console.log(appointment)

    await this.ormRepository.delete(appointment.id)

  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({ where: { id: id } })

    return appointment || undefined
  }
}

export default AppointmentsRepository
