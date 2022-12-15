interface IUpdateGoalsPatientDTO {
  goals_id: string;
  typeofgoal: string;
  from: Date;
  to: Date;
  description: string;
  points: number;
}

export { IUpdateGoalsPatientDTO };
