import { TableCell, styled } from "@mui/material";

export const BorderedTableCell = styled(TableCell)(({ theme }) => ({
    border: "solid 1px",
    borderColor: theme.palette.divider,
    height: "32px",
}));