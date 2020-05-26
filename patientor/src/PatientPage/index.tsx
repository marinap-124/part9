import React from "react";
import {  useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { setId } from "../state/reducer";
import { Button } from "semantic-ui-react";
import {  Entry, FormValues } from "../types";
import PatientDataComponent from "../components/PatientDataComponent"; 
import EntriesComponent from "../components/EntriesComponent";
// import { HealthCheckFormValues } from "../AddHealthCheckModal/AddEntryForm";
// import { HospitalFormValues } from "../AddHospitalModal/AddEntryForm";
// import { OccupationalFormValues } from "../AddOccupationalModal/AddEntryForm";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import AddHealthCheckModal from "../AddHealthCheckModal";
import AddHospitalModal from "../AddHospitalModal";
import AddOccupationalModal from "../AddOccupationalModal";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { addEntry } from "../state/reducer";


const PatientPage: React.FC = () => {

  const [{ visited },  dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = visited[id];

  React.useEffect(() => {
    dispatch(setId(id));     
    }, [dispatch, id]);


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };


  const [modalOpenType, setModalOpenType] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>();
    
  const openModalType = (): void => setModalOpenType(true);
    
  const closeModalType = (): void => {
      setModalOpenType(false);
      setError(undefined);
    };


  if(patient === undefined)
  return null;


  const submitNewEntry = async (values: FormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };



  const submitEntryType =  (values: EntryFormValues) => {
    try {
      setType(values.type);
      closeModalType();
      openModal();
      
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <PatientDataComponent  {...patient}  />
      <EntriesComponent  {...patient}  />

      <AddEntryModal
        modalOpen={modalOpenType}
        onSubmit={submitEntryType}
        error={error}
        onClose={closeModalType}
      />


      <div>
        {
          (() => 
          {
            switch(type)
            {
              case "HealthCheck":
                return(
                  <AddHealthCheckModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                 />
                  
                );

              case "Hospital":            
                return(
                  <AddHospitalModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />    
                );

              case "OccupationalHealthcare":
                return(
                  <AddOccupationalModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                 />              
                );

              default:
                return(<div></div>);           
            } 

          }
          )()          
        }
        </div>

      <Button onClick={() => openModalType()}>Add New Entry</Button>     
    </div>
  );
};

export default PatientPage;