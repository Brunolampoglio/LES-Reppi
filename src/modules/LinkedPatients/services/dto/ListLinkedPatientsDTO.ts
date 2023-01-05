interface IListLinkedPatientsDTO {
  gestor_id: string;
  page?: number;
  limit?: number;
}

interface IListByNameLinkedPatientsDTO {
  name: string;
  gestor_id: string;
  page?: number;
  limit?: number;
}

export { IListLinkedPatientsDTO, IListByNameLinkedPatientsDTO };
