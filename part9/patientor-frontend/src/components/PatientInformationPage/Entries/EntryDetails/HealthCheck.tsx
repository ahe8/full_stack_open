import { HealthCheckEntry } from "../../../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import { Stack, Typography } from "@mui/material";

interface HealthCheckProps {
    entry: HealthCheckEntry;
}

const HealthCheckProps = (props: HealthCheckProps) => {
    const { entry } = props;

    

    return (
        <div>
            <Stack alignItems="center" direction="row" gap={1}>
                <Typography>{entry.date}</Typography>
                <MonitorHeartIcon /> 
            </Stack>
            <i>{entry.description}</i>
            <div>
                {
                    entry.healthCheckRating === 0
                        ? <FavoriteIcon style={{ color: 'green' }} />
                        : <FavoriteIcon style={{ color: 'yellow' }} />
                }
            </div>
        </div>
    );
};

export default HealthCheckProps;


