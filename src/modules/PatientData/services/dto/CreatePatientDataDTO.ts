interface IPatientDataCreate {
  colesterol?: string;
  creatinina?: string;
  hemoglobina_glicada?: string;
  peso: string;
  descricao: string;
  patientId: string;
  eletrocardiograma?: string | undefined;
}

export { IPatientDataCreate };
