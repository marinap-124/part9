import React from 'react';
import { OccupationalHealthcareEntry } from "../types";

const Sickleave = (props: OccupationalHealthcareEntry) => {
    if(!props.sickLeave)
      return (
        <div></div>
      );
  
    return (
      <>
      
        <h4>Sick leave</h4>
        <ul>
          <li>start date: {props.sickLeave.startDate}</li>
          <li>end date: {props.sickLeave.endDate}</li>
        </ul>
      
      </>
    );
  };

export default Sickleave;