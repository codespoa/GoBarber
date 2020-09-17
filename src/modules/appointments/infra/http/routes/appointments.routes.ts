import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthenticad from "@modules/users/infra/http/middleware/ensureAuthenticad";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticad);

// appointmentsRouter.get("/", async (request, response) => {
//   const allAppointments = await appointmentsRepository.find();

//   return response.json(allAppointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  const appointmentsRepository = new AppointmentsRepository();

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository
  );
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
