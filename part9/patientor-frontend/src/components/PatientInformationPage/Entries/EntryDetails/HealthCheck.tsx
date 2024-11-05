import { HealthCheckEntry, HealthCheckRating } from "../../../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import { Stack, Typography } from "@mui/material";

interface HealthCheckProps {
    entry: HealthCheckEntry;
}

const HealthCheckProps = (props: HealthCheckProps) => {
    const { entry } = props;

    const getRating = () => {
        switch (entry.healthCheckRating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                break;
        }
    };

    return (
        <div>
            <Stack alignItems="center" direction="row" gap={1}>
                <Typography>{entry.date}</Typography>
                <MonitorHeartIcon />
            </Stack>
            <i>{entry.description}</i>
            <Stack alignItems="center" direction="row" gap={1}>
                <FavoriteIcon style={{ color: getRating() }} /> <Typography>{HealthCheckRating[entry.healthCheckRating].split(/(?=[A-Z])/).join(' ')}</Typography>
            </Stack>
        </div>
    );
};

export default HealthCheckProps;


