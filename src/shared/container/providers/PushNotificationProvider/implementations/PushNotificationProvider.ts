import axios, { AxiosInstance } from 'axios';
import { IPushNotificationProvider } from '../models/IPushNotificationProvider';
import { ISendPushNotificationDTO } from '../dtos/ISendPushNotificationDTO';

class PushNotificationProvider implements IPushNotificationProvider {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: {
        Host: 'exp.host',
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      baseURL: 'https://exp.host/--/api/v2/push/',
    });
  }

  public async sendPushNotification({
    device_token,
    title,
    content,
  }: ISendPushNotificationDTO): Promise<void> {
    const message = {
      to: device_token,
      title,
      body: content,
    };

    await this.api.post('send', message);
  }
}

export { PushNotificationProvider };
