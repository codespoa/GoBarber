import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from './../repositories/AppointmentsRepository'
import CreateAppointmentService from './../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/', (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const allAppointments = appointmentsRepository.find()

    return response.json(allAppointments)
})

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body
        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService()
        const appointment = await createAppointment.execute({ date: parsedDate, provider })

        return response.json(appointment)
    }catch(err) {
        return response.status(400).json( { error: err.message } )
    }
})

appointmentsRouter.get('/test', (request, response) => {
    return response.json({ message: 'listando' })
})

export default appointmentsRouter