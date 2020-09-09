import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from "../error/AppError";

import AppointmentsRepository from "./../repositories/AppointmentsRepository";
import CreateAppointmentService from "../../modules/repositories/services/CreateAppointmentService";
import ensureAuthenticad from "../middlewares/ensureAuthenticad";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticad);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const allAppointments = await appointmentsRepository.find();

  return response.json(allAppointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
