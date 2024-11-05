import { InputLabel, TextField } from "@mui/material";
import { entryFormTextFieldProps } from "../../../constants";

const OccupationalHealthcareEntryForm = () => {
    return (
        <>
            <TextField name="employerName" required label="Employer Name" {...entryFormTextFieldProps} />
            <InputLabel sx={{mt:2}}>Sick Leave</InputLabel>
            <TextField name="startDate" label="Start Date" type="date" {...entryFormTextFieldProps} />
            <TextField name="endDate" label="End Date" type="date" {...entryFormTextFieldProps} />
        </>
    );
};

export default OccupationalHealthcareEntryForm;