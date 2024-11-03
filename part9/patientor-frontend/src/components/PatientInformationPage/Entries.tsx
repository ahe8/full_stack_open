import { useState, useEffect } from "react";
import { Diagnosis, Entry } from "../../types";

import diagnosisService from '../../services/diagnoses';

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
                    <div key={entry.id}>
                        <p>{entry.date} <i>{entry.description}</i></p>

                        {entry.diagnosisCodes &&
                            <ul>
                                {entry.diagnosisCodes.map(code => (
                                    <li key={`${entry.id}${code}`}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)
                                )}
                            </ul>
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Entries;