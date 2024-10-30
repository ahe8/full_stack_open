import { isNotNumber } from "./utils"

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let parsedArgs: number[] = [];

    for(let i = 2; i < args.length; i++) {
        if (!isNotNumber(args[i])) {
            parsedArgs.push(Number(args[i]))
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return parsedArgs;
}


const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;

    const average = dailyExerciseHours.reduce((sum, curr) => sum + curr, 0) / dailyExerciseHours.length;

    return {
        periodLength,
        trainingDays,
        success: trainingDays >= target,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target,
        average: average
    }
}

const args = parseArguments(process.argv)
console.log(calculateExercises(args.slice(0, args.length - 1), args[args.length - 1]))