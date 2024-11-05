import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import { Patient } from "../../types";

import Entries from "./Entries";

import { Button, Alert } from "@mui/material";
import AddEntryForm from "./AddEntryForm";

const PatientInformationPage = () => {
    const [patient, setPatient] = useState<Patient | null>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const match = useMatch('/patients/:id');

    useEffect(() => {
        if (match) {
            const { id } = match.params;

            if (id) {
                patientService.getPatient(id)
                    .then(patientData => setPatient(patientData))
                    .catch(err => console.log(err));
            }
        }
    }, [match]);

    if (!patient) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {
                showForm
                    ? <AddEntryForm setShowForm={setShowForm} patient={patient} setErrorMessage={setErrorMessage} setPatient={setPatient} />
                    : <Button variant="contained" onClick={() => setShowForm(true)} >Add Entry</Button>
            }
            <Entries entries={patient.entries} />
        </div>

    );
};

export default PatientInformationPage;