import { IconButton, styled, alpha } from "@mui/material";

export const CreateTaskButton = styled(IconButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    border: `2px ${alpha(theme.palette.primary.main, 0.53)} dashed`,
    width: "128px",
    height: "128px",
    "& > svg": {
        width: "32px",
        height: "32px"
    }
}));