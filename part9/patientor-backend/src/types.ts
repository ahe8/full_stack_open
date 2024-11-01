export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  occupation: string;
  gender: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, "id">;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}