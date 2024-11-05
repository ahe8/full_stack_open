import { Entry, Gender, NewPatientEntry, Diagnosis, HealthCheckRating } from './types';
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

const NewEntryTypeDiscriminatorSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("OccupationalHealthcare"),
        employerName: z.string(),
        sickLeave: z.object({
            startDate: z.string().date(),
            endDate: z.string().date()
        }).optional()
    }),
    z.object({
        type: z.literal("HealthCheck"),
        healthCheckRating: z.nativeEnum(HealthCheckRating)
    }),
    z.object({
        type: z.literal("Hospital"),
        discharge: z.object({
            date: z.string().date(),
            criteria: z.string()
        })
    }),
]);

export const NewEntrySchema = z.object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.custom<Diagnosis['code']>()).optional()
}).and(NewEntryTypeDiscriminatorSchema);



export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};


// export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//     return NewPatientSchema.parse(object);
// };