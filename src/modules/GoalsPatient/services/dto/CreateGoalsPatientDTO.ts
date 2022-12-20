interface ICreateGoalsPatientDTO {
  typeofgoal: string;
  from: string;
  to: string;
  description: string;
  points: number;
  patient_id: string;
  type?: string;
}

export { ICreateGoalsPatientDTO };
