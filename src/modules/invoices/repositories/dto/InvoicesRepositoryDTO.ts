interface IInvoiceCreate {
  desc: string;
  plan_id: string;
  user_id: string;
}

interface IFindByDate {
  startDate: Date;
  endDate: Date;
}

export { IInvoiceCreate, IFindByDate };
