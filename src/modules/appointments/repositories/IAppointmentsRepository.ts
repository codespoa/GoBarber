import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDtO from '../dtos/ICreateAppointmentDTO'

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDtO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>;
}


export default IAppointmentsRepository;