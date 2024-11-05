import React, { useEffect, useState } from "react";

import { FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent, Stack, TextField, OutlinedInput } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { Diagnosis, Patient, EntryType, HealthCheckRating, Entry } from "../../../types";
import { entryFormTextFieldProps } from "../../../constants";
import { assertNever } from "../../../utils";
import diagnosesService from "../../../services/diagnoses";
import patientsService from "../../../services/patients";

import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";

interface AddEntryFormProps {
    patient: Patient;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null | undefined>>;
}

interface NewEntryInterface {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    type?: EntryType,
    healthCheckRating?: HealthCheckRating,
    employerName?: string,
    sickLeave?: {
        startDate?: string;
        endDate?: string;
    },
    discharge?: {
        date?: string;
        criteria?: string;
    }
}

const theme = createTheme({
    palette: {
        secondary: grey
    }
});


const AddEntryForm = (props: AddEntryFormProps) => {
    const [entryType, setEntryType] = useState<EntryType>(EntryType.OccupationalHealthcare);
    const [diagnosesCodes, setDiagnosesCodes] = useState<Diagnosis[]>([]);
    const [diagnosesCodeValues, setDiagnosesCodeValues] = useState<Diagnosis['code'][]>([]);

    useEffect(() => {
        diagnosesService.getAll()
            .then(data => setDiagnosesCodes(data));
    }, []);

    const handleEntryTypeChange = (event: SelectChangeEvent<typeof entryType>) => {
        setEntryType(event.target.value as EntryType);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            startDate,
            endDate,
            dischargeDate,
            criteria,
            healthCheckRating
        } = event.target;

        let newEntry: NewEntryInterface = {
            description: description.value,
            date: date.value,
            specialist: specialist.value,
            diagnosisCodes: diagnosisCodes.value.length > 0 ? diagnosisCodes.value.split(",") : []
        };

        switch (entryType) {
            case EntryType.OccupationalHealthcare:
                newEntry = {
                    ...newEntry,
                    type: EntryType.OccupationalHealthcare,
                    employerName: employerName.value,
                    ...(startDate.value && {
                        sickLeave: {
                            ...(startDate.value && { startDate: startDate.value }),
                            ...(endDate.value && { endDate: endDate.value })
                        }
                    })
                };
                break;
            case EntryType.HealthCheck:
                newEntry = {
                    ...newEntry,
                    type: EntryType.HealthCheck,
                    healthCheckRating: Number(HealthCheckRating[healthCheckRating.value])
                };
                break;
            case EntryType.Hospital:
                newEntry = {
                    ...newEntry,
                    type: EntryType.Hospital,
                    discharge: {
                        date: dischargeDate.value,
                        criteria: criteria.value
                    }
                };
                break;
            default:
                assertNever(entryType);
        }

        patientsService.addEntry(props.patient, newEntry as Entry)
            .then((updatedPatient) => {
                props.setShowForm(false);
                props.setPatient(updatedPatient);
                props.setErrorMessage('');
            })
            .catch(err => {
                const error = err.response.data.error[0];
                props.setErrorMessage(`${error.message} - ${error.path[0]}`);
            });
    };

    const handleDiagnosesCodeChange = (event: SelectChangeEvent<typeof diagnosesCodeValues>) => {
        const {
            target: { value },
        } = event;
        setDiagnosesCodeValues(typeof value === 'string' ? value.split(',') : value,);
    };

    const entryTypeForm = () => {
        switch (entryType) {
            case EntryType.OccupationalHealthcare:
                return <OccupationalHealthcareEntryForm />;
            case EntryType.Hospital:
                return <HospitalEntryForm />;
            case EntryType.HealthCheck:
                return <HealthCheckEntryForm />;
            default:
                return assertNever(entryType);
        }
    };

    return (
        <div style={{ 'border': '1px dotted black', 'padding': '1em' }}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Entry Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={entryType}
                    label="entryType"
                    onChange={handleEntryTypeChange}
                >
                    {
                        Object.values(EntryType)
                            .map(
                                type =>
                                    <MenuItem key={type} value={type}>
                                        {type.split(/(?=[A-Z])/).join(" ")}
                                    </MenuItem>
                            )
                    }
                </Select>
            </FormControl>

            <h2>New {entryType.split(/(?=[A-Z])/).join(" ")} entry</h2>

            <form onSubmit={handleSubmit}>
                <TextField required name="description" label="Description" {...entryFormTextFieldProps} />
                <TextField required name="date" label="Date" type="date" {...entryFormTextFieldProps} />
                <TextField required name="specialist" label="Specialist" {...entryFormTextFieldProps} />

                <FormControl sx={{ mt: 2 }} fullWidth>
                    <InputLabel id="diagnosis-code-label">Diagnosis Codes</InputLabel>
                    <Select
                        labelId="diagnosis-code-label"
                        id="diagnosis-code-multiple"
                        name="diagnosisCodes"
                        multiple
                        value={diagnosesCodeValues}
                        onChange={handleDiagnosesCodeChange}
                        input={<OutlinedInput label="Diagnosis Codes" />}
                    >
                        {diagnosesCodes.map(({ code }) => (
                            <MenuItem key={code} value={code}>
                                {code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {entryTypeForm()}

                <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", mt: '1em' }}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={() => props.setShowForm(false)} variant="contained" color='secondary'>
                            Cancel
                        </Button>
                    </ThemeProvider>
                    <Button variant="contained" color="primary" type="submit">Add</Button>
                </Stack>
            </form>
        </div>
    );
};

export default AddEntryForm;