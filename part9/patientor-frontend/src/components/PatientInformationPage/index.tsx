import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import { Patient } from "../../types";

import Entries from "./Entries";

const PatientInformationPage = () => {
    const [patient, setPatient] = useState<Patient | null>();

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
            <Entries entries={patient.entries} />
        </div>

    );
};

export default PatientInformationPage;