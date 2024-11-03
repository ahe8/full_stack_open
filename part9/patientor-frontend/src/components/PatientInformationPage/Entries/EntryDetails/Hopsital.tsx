import { HospitalEntry } from "../../../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Stack, Typography } from "@mui/material";

interface HospitalProps {
    entry: HospitalEntry;
}

const Hospital = (props: HospitalProps) => {
    const { entry } = props;

    return (
        <div>
            <Stack alignItems="center" direction="row" gap={1}>
                <Typography>{entry.date}</Typography>
                <LocalHospitalIcon /> 
            </Stack>
            <p><i>{entry.description}</i></p>

            <div>
                <u>Discharge Date - {entry.discharge.date}</u>
                <ul>
                    <li>{entry.discharge.criteria}</li>
                </ul>
            </div>

        </div>
    );
};

export default Hospital;


