
import { calculateBmi } from "./bmi";


if (process.argv.length <= 3) {
    console.log("Usage: npm run calculateBmi height_param weight_param");
    process.exit(-1);
}

const h = Number(process.argv[2]);
const w = Number(process.argv[3]);
console.log(calculateBmi(h, w));

