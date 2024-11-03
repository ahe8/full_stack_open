import { Entry } from "../../types";

interface EntriesProps {
    entries: Entry[];
}

const Entries = (props: EntriesProps) => {
    const { entries } = props;

    return (
        <div>
            <h2>entries</h2>
            {
                entries.map(entry => (
                    <div>
                        <p>{entry.date} <i>{entry.description}</i></p>

                        {entry.diagnosisCodes &&
                            <ul>
                                {entry.diagnosisCodes.map(code => <li>{code}</li>)}
                            </ul>
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Entries;