import Appointment from "../infra/typeorm/entities/Appointment"
import ICreateAppointmentDtO from "../dtos/ICreateAppointmentDTO"

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDtO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findById(id: string): Promise<Appointment | undefined>;
  remove(id: string): Promise<any | undefined>;
}

export default IAppointmentsRepository
