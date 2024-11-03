import { Entry, Diagnosis } from "../../../../types";

import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hopsital";
import HealthCheck from "./HealthCheck";

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails = (props: EntryProps) => {
    const { entry, diagnoses } = props;

    const entryStyle = {
        'border': '1px solid black',
        'padding': '0.5em'
    };

    const entryDetails = () => {
        switch (entry.type) {
            case 'Hospital':
                return <Hospital entry={entry} />;
            case 'HealthCheck':
                return <HealthCheck entry={entry} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcare entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    const diagnostisCodesMap = entry.diagnosisCodes?.map(code => (
        <li key={`${entry.id}${code}`}>{code} {diagnoses.find(d => d.code === code)?.name}</li>)
    );

    return (
        <div style={entryStyle}>
            {entryDetails()}
            {entry.diagnosisCodes &&
                <>
                    <u>Diagnostic Codes</u>
                    <ul>
                        {diagnostisCodesMap}
                    </ul>
                </>
            }
            <p>diagnoses by {entry.specialist}</p>
        </div>
    );
};


export default EntryDetails;