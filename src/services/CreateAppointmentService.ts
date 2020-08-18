import Appointment from './../models/Appointment';
import { startOfHour } from 'date-fns'
import AppointmentsRepository from './../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string
    date: Date
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({ provider, date }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date)
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('Horario de agendamento está indisponível')
        }

        const appointment = this.appointmentsRepository.create({
            provider: provider,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService