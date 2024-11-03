import { Entry, Gender, NewPatientEntry } from './types';
import { z } from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.custom<Entry>())
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};