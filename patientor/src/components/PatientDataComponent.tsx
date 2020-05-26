import React from 'react';
import GenderComponent from "./GenderComponent";
import { Patient } from "../types";

const PatientDataComponent: React.FC<Patient> = (patient) => {

    if(!patient)
      return (
        <div></div>
    );
  
    return(
      <>
        <h3>{patient.name}
        <GenderComponent  {...patient} /> 
        </h3>

        <ul>
          <li>ssn: {patient.ssn}</li>
          <li>occupation: {patient.occupation} </li>
        </ul>  
      </>
    ); 
  };

export default PatientDataComponent;