import { NewPatientEntry, Gender, Entry, NewEntry, NewBaseEntry, 
  NewHealthCheckEntry, NewOccupationalHealthcareEntry, NewHospitalEntry,
  HealthCheckRating, Discharge, SickLeave } from './types';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseString = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
  
    return name;
  }

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    } 
    return gender;
};

const isSsn = (ssn: string): boolean => {
    const regExp = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[01]\dA)\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/;
    return  regExp.test(ssn);
  };
  
  const parseSsn = (ssn: string): string | undefined => {
    if (!ssn)
      return undefined;

    if (!isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect  ssn: ' + ssn);
    }
    return ssn;
  };

  const parseDateOfBirth = (dateOfBirth: string): string | undefined => {
    if (!dateOfBirth)
      return undefined;

    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect  dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

  

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(Number(param)) 
           && !isNaN(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (healthCheckRating === null || healthCheckRating === ''  || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    } 
    return Number(healthCheckRating);
};

const isDischarge = (discharge: any): discharge is Discharge => {
  return isString(discharge.criteria) && isDate(discharge.date);
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
      throw new Error('Incorrect or missing discharge: ' + discharge);
  } 
  return discharge;
};

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (!sickLeave.startDate || !isDate(sickLeave.startDate)) {
    throw new Error('Incorrect or missing sick leave start date: ' + sickLeave);
  } 

  if (!sickLeave.endDate || !isDate(sickLeave.endDate)) {
    throw new Error('Incorrect or missing sick leave end date: ' + sickLeave);
  } 

  return isDate(sickLeave.startDate) && isDate(sickLeave.endDate);
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave)
    return undefined;

  if (!isSickLeave(sickLeave)) {
      throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  } 
  return sickLeave;
};



  const parseEntries = (entries: any): Entry[] => {
    // if (!gender || !isGender(gender)) {
    //     throw new Error('Incorrect or missing weather: ' + gender);
    // } 
    return entries;
};

  
/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    occupation: parseString(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    entries: parseEntries(object.entries)
  };
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: NewEntry): NewEntry => {
   const base: NewBaseEntry = {  
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: object.diagnosisCodes
  };

  switch(object.type){
    case "HealthCheck":

      const a: NewHealthCheckEntry =     
      {
        ...base,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type: "HealthCheck"
      };

      return a;

    case "OccupationalHealthcare":
      const b: NewOccupationalHealthcareEntry =     
      {
        ...base,
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        type: "OccupationalHealthcare"
      };
  
      return b;
      
      
    case "Hospital":
      const c: NewHospitalEntry =     
      {
        ...base,
        discharge: parseDischarge(object.discharge),
        type: "Hospital"
      };
    
      return c;     

    default:
        return assertNever(object);

  } 

};