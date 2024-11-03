import { OccupationalHealthcareEntry } from "../../../../types";
import { Stack, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthcareProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
    const { entry } = props;


    return (
        <div>
            <Stack alignItems="center" direction="row" gap={1}>
                <Typography>{entry.date}</Typography>
                <WorkIcon />
                <Typography>{entry.employerName}</Typography>
            </Stack>
            <i>{entry.description}</i>
            {entry.sickLeave &&
                <div>
                    <ul style={{'padding':'0', 'listStyleType': 'none'}}>
                        <u>Sick Leave</u>
                        <li>Start Date - {entry.sickLeave.startDate}</li>
                        <li>End Date - {entry.sickLeave.endDate}</li> 
                    </ul>
                </div>
            }
        </div>
    );
};

export default OccupationalHealthcare;


