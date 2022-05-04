import axios from 'axios';

const OneSignalApi = axios.create({
  baseURL: 'https://onesignal.com/api/v1/notifications',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${process.env.ONE_SIGNAL_KEY || 'Basic'}`,
  },
});

export { OneSignalApi };
