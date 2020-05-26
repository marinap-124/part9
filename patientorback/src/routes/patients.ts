import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  if(patientService.getEntries() !== null && patientService.getEntries().length > 0){
    res.send(patientService.getEntries());
  } else{
    res.send('ERROR in patients');
  }
    
});


router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})


router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);    
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch(e){
      res.status(400).send(e.message);
  }

});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);    
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch(e){
      res.status(400).send(e.message);
  }

});

router.post('/:id/entries', (req, res) => {
  try{
    const patient = patientService.findById(req.params.id);

    if (patient) {
      const newEntry = toNewEntry(req.body);    
      const addedEntry = patientService.addEntryForPatient(newEntry, patient);
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }



  } catch(e){
      res.status(400).send(e.message);
  }

});


export default router;