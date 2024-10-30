import { isNotNumber } from "./utils"

interface bmiCalculationValues {
    height: number;
    weight: number;
}


const parseArguments = (args: string[]): bmiCalculationValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


const calculateBmi = (height: number, weight: number): string => {
    const result = weight / Math.pow((height / 100), 2);

    if (result < 16.0) {
        return "Underweight (Severe thinness)"
    } else if (result < 16.9) {
        return "Underweight (Moderate thinness)	"
    } else if (result < 18.4) {
        return "Underweight (Mild thinness)"
    } else if (result < 24.9) {
        return "Normal range"
    } else if (result < 29.9) {
        return "Overweight (Pre-obese)"
    } else if (result < 34.9) {
        return "Obese (Class I)"
    } else if (result < 39.9) {
        return "Obese (Class II)"
    } else {
        return "Obese (Class III)"
    };
}

const args = parseArguments(process.argv)
console.log(calculateBmi(args.height, args.weight))