import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!isNaN(height) && !isNaN(weight)) {
        res.send({
            height,
            weight,
            bmi: calculateBmi(height, weight)
        });
    } else {
        res.status(400).send({
            error: 'malformatted parameters'
        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (daily_exercises === null || target === null) {
        res.status(400).send({ error: "parameters missing" });
    }
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(h => isNaN(Number(h)))) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.send(result);

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});