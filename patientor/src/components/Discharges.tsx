import React from 'react';
import { Discharge } from "../types";

const Discharges = (props: Discharge) => {
    if(props.date === '' && props.criteria === '')
      return (
        <div></div>
      );
  
    return (
      <div>
        <h4>Discharges</h4>
        <ul>
          <li>date: {props.date}</li>
          <li>criteria: {props.criteria}</li>
        </ul>
      </div>
  
    );
  };

export default Discharges;