export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
  }

export interface PatientEntry {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
  }

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type ShortPatientEntry = Omit<PatientEntry, "ssn">;


export enum Gender { 
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
   type: "Hospital";
   discharge: Discharge;
}

export interface Discharge {
  date: string;
  criteria: string;
}


export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}


export interface SickLeave {
  startDate: string;
  endDate: string;
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;


export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;


