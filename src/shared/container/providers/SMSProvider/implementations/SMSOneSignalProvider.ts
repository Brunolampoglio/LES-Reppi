/* eslint-disable no-console */
import { injectable } from 'tsyringe';

import { OneSignalApi } from '@shared/apis/OneSignalApi';

import { ISMSProvider } from '../models/ISMSProvider';
import { ISendSMSDTO } from '../dtos/ISendSMSDTO';

@injectable()
class SMSOneSignalProvider implements ISMSProvider {
  public async sendSMS({
    message,
    number,
    sms_name,
  }: ISendSMSDTO): Promise<void> {
    try {
      OneSignalApi.post('/', {
        app_id: process.env.ONE_SIGNAL_APP_ID,
        name: sms_name || 'Booat SMS',
        sms_from: process.env.ONE_SIGNAL_NUMBER,
        contents: { en: message },
        include_phone_numbers: [number],
      });
    } catch (error) {
      console.log(`OneSignal Error: ${error}`);
    }
  }
}

export { SMSOneSignalProvider };
