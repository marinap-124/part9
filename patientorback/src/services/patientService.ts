import patientData from '../../data/patients'
import { PatientEntry, NewPatientEntry, ShortPatientEntry, Entry, NewEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): ShortPatientEntry [] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
    entries
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const guid = () => {
  const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const addEntry = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: guid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryForPatient = ( entry: NewEntry, patient: PatientEntry ): Entry => {
  const newEntry = {
    id: guid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};


export default {
  getEntries,
  addEntry,
  findById,
  addEntryForPatient
};