import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});