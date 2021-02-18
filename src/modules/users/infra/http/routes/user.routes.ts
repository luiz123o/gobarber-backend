import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticaded from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    },
  }),
  userController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
