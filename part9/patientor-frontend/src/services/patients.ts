import axios from "axios";
import { Patient, PatientFormValues, NonSensitivePatientInfo, EntryWithoutId, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};


const getNonSensitiveEntries = async () => {
  const { data } = await axios.get<NonSensitivePatientInfo[]>(
    `${apiBaseUrl}/patients`
  );

  return data.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};


const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patient: Patient, entry: EntryWithoutId) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patient.id}/entries`,
    entry
  );
  return data;
};

export default {
  getAll, create, getNonSensitiveEntries, getPatient, addEntry
};

