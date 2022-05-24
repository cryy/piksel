import { alpha, styled } from "@mui/material";
import { BorderedTableCell } from ".";

export const BorderedTableCellHeader = styled(BorderedTableCell)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.32),
    fontWeight: 600,
}));