const calculateBmi = (height: number, weight: number) => {
    if( height <= 0 || weight <= 0) throw new Error('Weight and height must be positive numbers');

    const bmi = weight / (height / 100 * height / 100);

    let printText;
    if (bmi < 15) {
        printText = 'Very severely underweight';
    } else if (bmi >= 15 && bmi < 16) {
        printText = 'Severely underweight';
    } else if (bmi >= 16 && bmi < 18.5) {
        printText = 'Severely underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        printText = 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        printText = 'Overweight';
    } else if (bmi >= 30 && bmi < 35) {
        printText = 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi < 40) {
        printText = 'Obese Class II (Severely obese)';
    } else if (bmi >= 40) {
        printText = 'Obese Class III (Very severely obese)';
    }         


    return printText;
};

export { calculateBmi };