import { Router } from "express"

import ensureAuthenticad from "@modules/users/infra/http/middleware/ensureAuthenticad"

import AppointmentController from '../controllers/AppointmentsController'
const appointmentController = new AppointmentController()

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticad)

// appointmentsRouter.get("/", async (request, response) => {
//   const repositories = getRepository(Appointment)

//   const allRepositories = await repositories.find()

//   return response.json(allRepositories)
// })

appointmentsRouter.post("/", appointmentController.create)

appointmentsRouter.delete("/:id", appointmentController.delete)

export default appointmentsRouter
