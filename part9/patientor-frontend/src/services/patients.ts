import axios from "axios";
import { Patient, PatientFormValues, NonSensitivePatientInfo } from "../types";

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

  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getNonSensitiveEntries
};

