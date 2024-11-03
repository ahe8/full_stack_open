import patientData from '../../data/patients-full';

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
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

const findById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};


const addPatient = (patient: NewPatientEntry): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...patient,
        entries: []
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