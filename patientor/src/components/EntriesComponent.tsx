import React from 'react';
import EntryComponent  from "./EntryComponent";
import { Patient } from "../types";
import { Table } from "semantic-ui-react";

const EntriesComponent: React.FC<Patient> = (patient) => {

    if(!patient || !patient.entries)
      return (
        <div></div>
    );
  
    return(
      <>
        <h3>Entries</h3>
        <Table>
            <Table.Body>

            {patient.entries.map(entry =>
              
              <Table.Row key={entry.id}>
                <Table.Cell>
                  <EntryComponent  {...entry}  /> 
                </Table.Cell>  
              </Table.Row>
            )}

          </Table.Body>
        </Table> 
      </>
    ); 
  };

export default EntriesComponent;