/* eslint-disable no-console */
import https from 'https';

import { AppError } from '@shared/error/AppError';
import { IPushNotificationProvider } from '../models/IPushNotificationProvider';
import { ISendPushNotificationDTO } from '../dtos/ISendPushNotificationDTO';

interface IContent {
  en?: string;
}

interface IData {
  app_id: string | undefined;
  headings: IContent;
  contents: IContent;
  channel_for_external_user_ids: string;
  include_external_user_ids: string[];
}

class OneSignalProvider implements IPushNotificationProvider {
  public async sendPushNotification({
    user_id,
    title,
    content,
    date,
  }: ISendPushNotificationDTO): Promise<void> {
    const sendNotification = (data: IData) => {
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${process.env.ONE_SIGNAL_KEY}`,
      };

      const options = {
        host: 'onesignal.com',
        port: 443,
        path: '/api/v1/notifications',
        method: 'POST',
        headers,
      };

      const request = https.request(options, response => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        response.on('data', data => {
          console.log('Response:');
          console.log(JSON.parse(data));
        });
      });

      request.on('error', e => {
        console.log(e);
        throw new AppError('Erro ao enviar a notificação');
      });

      request.write(JSON.stringify(data));
      request.end();
    };

    if (date) {
      const message = {
        app_id: process.env.ONE_SIGNAL_APP_ID,
        headings: { en: `${title}` },
        contents: { en: `${content}` },
        channel_for_external_user_ids: 'push',
        include_external_user_ids: [user_id],
        send_after: String(date),
      };

      sendNotification(message);
      return;
    }

    const message = {
      app_id: process.env.ONE_SIGNAL_APP_ID,
      headings: { en: `${title}` },
      contents: { en: `${content}` },
      channel_for_external_user_ids: 'push',
      include_external_user_ids: [user_id],
    };

    sendNotification(message);
  }
}

export { OneSignalProvider };
