import patientData from '../data/patients';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientData;

const getPatients = (): PatientEntry[] => {
    return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
        id,
        name,
        dateOfBirth,
        occupation,
        gender
    }));
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};


const addPatient = (patient: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...patient
    };

    patientData.push(newPatientEntry);
    return newPatientEntry;

};

export default {
    getPatients,
    addPatient,
    getNonSensitivePatientEntries,
    findById
};