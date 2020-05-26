import React from 'react';
import { Entry } from "../types";
import { Icon } from 'semantic-ui-react';
import Healthraiting  from "./Healthraiting";
import DiagnosesComponent from "./DiagnosesComponent";
import Discharges from "./Discharges";
import Sickleave from "./Sickleave";


const EntryComponent: React.FC<Entry> = (entry) => {

    if(!entry)
      return (
        <div></div>
    );
  
    return(
      <>
      <div>
        {
          (() => {
            switch(entry.type){
              case "HealthCheck":
                return(
                  
                  <>
                    <h3>
                      {entry.date}
                      <Icon enabled="true" name='user md' className="blue" /><br/>
                    </h3>
                    {entry.description}
                    <Healthraiting {...entry} />
                  </> 
                  
                );

              case "Hospital":
            
                return(
                  <>
                    <h3>
                      {entry.date}
                      <Icon enabled="true" name='hospital' className="blue" />
                    </h3>
                    {entry.description}
                    <Discharges {...entry.discharge} />
                  </>     
                );

              case "OccupationalHealthcare":
                return(
                  <>
                    <h3>
                      {entry.date}
                      <Icon enabled="true" name='stethoscope' className="blue" /> {entry.employerName}<br/>
                    </h3>
                    {entry.description}
                    <Sickleave {...entry} />                
                  </>                 
                );
              default:
                return(<Icon enabled="true" name='ambulance' />);           
            }
          })()

          }
          <DiagnosesComponent key={entry.id} {...entry}  />                
        </div>

      </>
    ); 
  };

export default EntryComponent;