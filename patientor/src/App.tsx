import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import {setPatientList, setVisited, setDiagnosisList} from "./state/reducer";


const App: React.FC = () => {
    const [{id, visited}, dispatch] = useStateValue();


  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    axios.get<void>(`${apiBaseUrl}/diagnoses`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
         dispatch(setPatientList(patientListFromApi));

      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

  }, [dispatch]);

  
  React.useEffect(() => {
    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
         dispatch(setDiagnosisList(diagnosisListFromApi));

      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosesList();

  }, [dispatch]);


  React.useEffect(() => {

    const fetchPatient = async () => {
      try {

        if(id && (id !== undefined || id !== '' ) && (visited[id] === null || visited[id] === undefined)){
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(setVisited(patientFromApi));
        }

      } catch (e) {
        console.error(e);
      }      
    };

    fetchPatient();
    
  }, [dispatch, id, visited]);


  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>           
            <Route path="/patients/:id" ><PatientPage /></Route>
            <Route path="/" ><PatientListPage /></Route>
          </Switch>
        </Container>
      </Router>

    </div>
  );
};

export default App;
