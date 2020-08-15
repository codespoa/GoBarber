import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from './../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, reponse) => {
    const allAppointments = appointmentsRepository.all()
    return reponse.json(allAppointments)
})

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body
    const parsedDate = startOfHour(parseISO(date))
    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

    if(findAppointmentInSameDate) {
        return response
        .status(400)
        .json({ message: 'Horario de agendamento está indisponível' })
    }

    const appointment = appointmentsRepository.create(provider, parsedDate)
    return response.json(appointment)
})

appointmentsRouter.get('/', (request, response) => {
    return response.json({ message: 'listando' })
})

export default appointmentsRouter