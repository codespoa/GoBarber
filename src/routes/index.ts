import { Router } from 'express';
import appointmentsRouter from './apointments.routes';

const routes = Router()

routes.use('/appointments', appointmentsRouter)

export default routes
