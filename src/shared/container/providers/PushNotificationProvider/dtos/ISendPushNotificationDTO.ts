interface ISendPushNotificationDTO {
  user_id: string;
  title?: string;
  content: string;
  date?: Date;
}

export { ISendPushNotificationDTO };
