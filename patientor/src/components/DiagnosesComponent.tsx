import React from 'react';
import { useStateValue } from "../state";
import { Entry } from "../types";

const DiagnosesComponent: React.FC<Entry> = (entry) => {
    const [{ diagnoses }] = useStateValue();
    if(!entry.diagnosisCodes)
      return (
        <div></div>
    );
  
    return(
      <>
      <h4>Diagnoses</h4>
      <ul>
        {entry.diagnosisCodes.map(code => 
          <li key={code}>
            {code} &nbsp;
            {diagnoses[code].name}
          </li>)}

      </ul>   
      </>
    ); 
  };

export default DiagnosesComponent;