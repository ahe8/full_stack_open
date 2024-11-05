import { InputLabel, TextField } from "@mui/material";
import { entryFormTextFieldProps } from "../../../constants";

const HospitalEntryForm = () => {
    return (
        <>
            <InputLabel sx={{mt:2}}>Discharge Information</InputLabel>
            <TextField required name="dischargeDate" label="Discharge Date" type="date" {...entryFormTextFieldProps} />
            <TextField required name="criteria" label="Criteria" {...entryFormTextFieldProps} />
        </>
    );
};

export default HospitalEntryForm;