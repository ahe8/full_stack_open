import axios from "axios";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const apiBaseUrl = 'http://localhost:3000/api';

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};


const getNonSensitiveEntries = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};


const create = async (object: unknown) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );
  return data;
};

export default {
  getAll, create, getNonSensitiveEntries
};

