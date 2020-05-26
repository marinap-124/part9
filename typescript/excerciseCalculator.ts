import { calculateExercises } from "./Exercise";

// const paramsArr = [3, 0, 2, 4.5, 0, 3, 1];
// const targetAmount = 2;

if (process.argv.length <= 3) {
    console.log("Usage: npm run calculateExercises target_param daily_hours_params");
    process.exit(-1);
}

 const targetAmount = Number(process.argv[2]);
 const paramsArr: number[] = process.argv.slice(3).map(x => Number(x));
 console.log(calculateExercises(targetAmount, paramsArr ));