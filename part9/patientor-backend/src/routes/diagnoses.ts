import express from 'express';
import diagnosesData from "../data/diagnoses";

type Diagnoses = {
    name: string;
    code: string;
    latin?: string;
};

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Diagnoses[] = diagnosesData;
    res.send(data);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});

export default router;