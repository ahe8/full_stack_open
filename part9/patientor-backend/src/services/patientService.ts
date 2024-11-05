import patientData from '../../data/patients-full';

import { Patient, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId } from '../types';
import { parseDiagnosisCodes } from "../utils";

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

const addEntry = (patient: Patient, entry: EntryWithoutId) => {
    const id = uuid();
    
    const newEntry = {
        id,
        ...entry,
        diagnosisCodes: parseDiagnosisCodes(entry)
    };
    
    patient.entries.push(newEntry);
    return patient;
};

export default {
    getPatients,
    addPatient,
    getNonSensitivePatientEntries,
    findById,
    addEntry
};