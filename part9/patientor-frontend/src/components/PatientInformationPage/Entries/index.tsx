import { useState, useEffect } from "react";
import { Diagnosis, Entry } from "../../../types";

import diagnosisService from '../../../services/diagnoses';
import EntryDetails from "./EntryDetails";

interface EntriesProps {
    entries: Entry[];
}

const Entries = (props: EntriesProps) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const { entries } = props;

    useEffect(() => {
        diagnosisService.getAll()
            .then(data => setDiagnoses(data));
    }, [entries]);

    return (
        <div>
            <h2>entries</h2>
            {
                entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                ))
            }
        </div>
    );
};

export default Entries;