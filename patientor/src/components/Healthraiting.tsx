import React from 'react';
import { HealthCheckRating, HealthCheckEntry } from "../types";
import { Icon } from 'semantic-ui-react';

const Healthraiting = (props: HealthCheckEntry) => {

    if(!props)
      return (
        <div></div>
      );
  
      switch(props.healthCheckRating){
        case HealthCheckRating.CriticalRisk:
          return(<div><Icon enabled="true" name='heart' className="red" /></div>);
  
        case HealthCheckRating.HighRisk:
          return(<div><Icon enabled="true" name='heart' className="red" /></div>);
  
        case HealthCheckRating.LowRisk:
          return(<div><Icon enabled="true" name='heart' className="yellow" /></div>);
  
        case HealthCheckRating.Healthy:
            return(<div><Icon enabled="true" name='heart' className="green" /></div>);
  
        default:
          return(<div></div>);           
      }
  };

export default Healthraiting;