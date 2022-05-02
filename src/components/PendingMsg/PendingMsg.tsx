import { Typography, CircularProgress } from "@mui/material";

const PendingMsg = () => (
    <Typography variant="h6">
        <CircularProgress size={18} sx={{ mr: 1 }} />
        Завантажується. Це може зайняти хвилину
    </Typography>
)
export default PendingMsg;
