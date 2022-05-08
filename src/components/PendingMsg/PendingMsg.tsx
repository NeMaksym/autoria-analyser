import { Typography, CircularProgress } from "@mui/material";

const PendingMsg = () => (
    <Typography variant="h6">
        <CircularProgress size={18} sx={{ mr: 1 }} />
        Треба почекати до 1 хв
    </Typography>
)
export default PendingMsg;
