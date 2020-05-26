import express from 'express';
import { calculateBmi as bmi } from "./bmi";
import { calculateExercises as calc } from "./Exercise";

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if(height === undefined || weight === undefined  || isNaN(Number(height))  || isNaN(Number(weight))){
        res.send({ "error": "malformatted parameters" });
    }

    const result = {"weight" : weight, 
                    "height" : height,
                    "bmi" : bmi(Number(height), Number(weight))              
                };
    res.send(result);
});


app.post('/exercises', (request, response) => {
    const params = request.body;
    if(params === undefined || params.target === undefined || params.daily_exercises === undefined)
        response.json({error: "parameters missing"});

    if(isNaN(Number(params.target)) ||  params.daily_exercises.some(isNaN))
        response.json({error: "malformatted parameters"});

    response.json(calc(Number(params.target), params.daily_exercises));
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});