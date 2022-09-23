import axios, { AxiosInstance } from 'axios';
import { ISendSMSDTO } from '../dtos/ISendSMSDTO';
import { ISMSProvider } from '../models/ISMSProvider';

class SMSZenviaProvider implements ISMSProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `https://api-rest.zenvia.com/services/`,
      auth: {
        username: process.env.ZENVIA_ACCOUNT || '',
        password: process.env.ZENVIA_PASSWORD || '',
      },
    });
  }

  async sendSMS({ message, number }: ISendSMSDTO): Promise<void> {
    await this.api.post('send-sms', {
      from: process.env.ZENVIA_PHONE_NUMBER,
      to: number,
      msg: message,
    });
  }
}

export { SMSZenviaProvider };
