import express, { Response } from 'express';
import patientData from "../data/patients";

type Patient = {
    name: string;
    dateOfBirth: string;
    gender: string;
    ssn: string;
    occupation: string;
};

type NonSensitivePatientInfo = Omit<Patient, "ssn">;

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
    res.send(patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })));
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});

export default router;