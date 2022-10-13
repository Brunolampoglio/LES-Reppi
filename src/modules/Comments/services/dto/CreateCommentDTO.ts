interface ICreateCommentDTO {
  comment: string;
  rate: number;
  userReceiver_id: string;
  userSender_id: string;
}

export { ICreateCommentDTO };
