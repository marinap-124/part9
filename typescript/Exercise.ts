import { Result } from "./Result";

export const calculateExercises = (target: number, dailyHours: number[]) => {
    if( target <= 0 ) throw new Error('Target must be a positive number');
    if( dailyHours === null || dailyHours.length === 0 ) throw new Error('Target must be a positive number');

    const periodLength = dailyHours.length;
    const daily = dailyHours.filter(hours => hours > 0);
    const trainingDays = daily.length;
    const sum =  daily.reduce((a, b) => a + b, 0);
    const average = sum / periodLength;
    const success = (average >= target)? true:false;

    let rating;
    let ratingDescription = '';

    if(average < target - target * 0.5){
        rating = 1;
        ratingDescription = 'bad';
    } else if(average >= target - target * 0.5  && average < target + target * 0.5){
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else if( average >= target + target * 0.5){
        rating = 2;
        ratingDescription = 'very good';
    }
    
    const obj: Result = {periodLength: periodLength, 
        trainingDays: trainingDays,
        success: success,
        rating: Number(rating),
        ratingDescription: ratingDescription, 
        target: target,
        average: average
    };

    return obj;
};