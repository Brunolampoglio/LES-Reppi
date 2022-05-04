import { container } from 'tsyringe';

import { ISMSProvider } from './models/ISMSProvider';

import { SNSProvider } from './implementations/SNSProvider';
import { SMSOneSignalProvider } from './implementations/SMSOneSignalProvider';

const smsDriver = process.env.SMS_DRIVER as 'sns';

const providers = {
  sns: container.resolve(SNSProvider),
  onesignal: container.resolve(SMSOneSignalProvider),
};

container.registerInstance<ISMSProvider>('SMSProvider', providers[smsDriver]); // --> providers[smsDriver] <-- Error
