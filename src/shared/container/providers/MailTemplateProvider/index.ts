import { container } from 'tsyringe';

import HandleBarsMailTemplateProvider from './implementations/HandleBarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

const providers = {
  handlebars: HandleBarsMailTemplateProvider,
};
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
