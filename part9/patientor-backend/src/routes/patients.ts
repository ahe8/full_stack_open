import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import patientService from '../services/patientService';

import { NewPatientEntry, NonSensitivePatientEntry, Patient, EntryWithoutId } from '../types';
import { NewEntrySchema, NewPatientSchema } from '../utils';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Patient>) => {
    const patient = patientService.findById(req.params.id);
    
    if (patient) {
        const patientWithNewEntry = patientService.addEntry(patient, req.body);
        res.json(patientWithNewEntry);
    } else {
        res.status(400);
    }
});

router.use(errorMiddleware);

export default router;