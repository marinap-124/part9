import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
    | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_ID";
      payload: string;
    }
  | {
      type: "SET_VISITED";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    }
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }; 

    case "SET_ID":
      return {
        ...state,
        id: action.payload
      };
      
    case "SET_VISITED":
      return {
        ...state,
        visited: {
          ...state.visited,
          [action.payload.id]: action.payload
        }
      };

    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
      

    case "ADD_ENTRY":
      const visited = state.visited;
      const patient = visited[state.id];
      const entries = patient.entries.concat(action.payload);
      const updated = {...state.visited[state.id], entries};
      // console.log("updated", updated);

      return {
        ...state,
        visited: {
          ...state.visited,
          [state.id]: updated

        }
      }; 

    default:
      return state;
   }
};

 export const setPatientList = (patientListFromApi: Patient[]): Action => {
     return  { type: "SET_PATIENT_LIST", payload: patientListFromApi };
 };

export const setVisited = (visited: Patient): Action => {
  return  { type: "SET_VISITED", payload: visited };
};

export const addPatient = (patient: Patient): Action => {
  return  { type: "ADD_PATIENT", payload: patient };
};

export const setId = (id: string): Action => {
  return  { type: "SET_ID", payload: id };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return  { type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi };
};

export const addEntry = (entry: Entry): Action => {
  return  { type: "ADD_ENTRY", payload: entry };
};



