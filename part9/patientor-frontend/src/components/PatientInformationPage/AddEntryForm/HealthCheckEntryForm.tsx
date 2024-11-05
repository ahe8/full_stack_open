import { useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";

const HealthCheckEntryForm = () => {
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating[HealthCheckRating.Healthy] as unknown as HealthCheckRating);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setHealthCheckRating(event.target.value as HealthCheckRating);
    };

    return (
        <>
            <FormControl fullWidth sx={{ mt: 2 }} required>
                <InputLabel id="demo-simple-select-label">Health Check Rating</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={'Healthy'}
                    value={healthCheckRating}
                    label="entryType"
                    onChange={handleChange}
                    name="healthCheckRating"
                >
                    {
                        Object.keys(HealthCheckRating).filter(r => isNaN(Number(r)))
                            .map(rating =>
                                <MenuItem key={rating} value={rating}>
                                    {rating.split(/(?=[A-Z])/).join(" ")}
                                </MenuItem>
                            )
                    }
                </Select>
            </FormControl>
        </>
    );
};

export default HealthCheckEntryForm;