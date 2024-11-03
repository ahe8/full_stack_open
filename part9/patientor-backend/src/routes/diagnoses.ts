import express from 'express';
import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const data: Diagnosis[] = diagnosesData;
    res.send(data);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});

export default router;