import React from 'react';
import { Patient, Gender } from "../types";
import { Icon } from 'semantic-ui-react';

const GenderComponent = (props: Patient) => {
    if(!props)
      return (
        <div></div>
      );
  
      switch(props.gender){
        case Gender.Male:
          return(
            <Icon enabled="true" name='mars' />
          );
  
        case Gender.Female:
          return(<Icon enabled="true" name='venus' />);
  
        case Gender.Other:
          return(<Icon enabled="true" name='neuter' />);
  
  
        default:
          return(<Icon enabled="true" name='genderless' />);           
      }
  };

export default GenderComponent;