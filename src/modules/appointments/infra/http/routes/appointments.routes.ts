import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appoitmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentsController();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appoitmentsRouter.get('/me', providerAppointmentController.index);

export default appoitmentsRouter;
