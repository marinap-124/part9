import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();


router.get('/', (_req, res) => {

  console.log('GETTING diagnoses from /');
  if(diagnoseService.getEntries() !== null && diagnoseService.getEntries().length > 0){
    res.send(diagnoseService.getEntries());
  } else{
    res.send('ERROR in dignoses');
  }
    
})

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
})

export default router;