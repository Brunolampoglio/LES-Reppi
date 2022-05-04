/* eslint-disable no-console */
import aws from 'aws-sdk';
import { injectable } from 'tsyringe';

import { ISMSProvider } from '../models/ISMSProvider';
import { ISendSMSDTO } from '../dtos/ISendSMSDTO';

@injectable()
class SNSProvider implements ISMSProvider {
  public async sendSMS({ message, number }: ISendSMSDTO): Promise<void> {
    const region = process.env.AWS_DEFAULT_REGION;

    aws.config.update({ region });

    const params = {
      Message: message,
      PhoneNumber: number,
    };

    const publishTextPromise = new aws.SNS().publish(params).promise();

    publishTextPromise
      .then(data => {
        console.log(`MessageID is ${data.MessageId}`);
      })
      .catch(err => {
        console.error(err, err.stack);
      });
  }
}

export { SNSProvider };
