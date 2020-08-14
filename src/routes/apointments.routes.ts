import { Router } from 'express'
const appointmentsRouter = Router()

appointmentsRouter.post('/', (request, response) => {
    return response.json({ message: "appointments" })
})

export default appointmentsRouter