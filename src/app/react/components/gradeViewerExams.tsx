import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";
import { BorderedTableCell } from "./borderedTableCell";
import { BorderedTableCellHeader } from "./borderedTableCellHeader";

export interface GradeViewerExamsProps {
    grade: Grade;
}

export function GradeViewerExams({ grade }: GradeViewerExamsProps) {
    const { lang } = useAppContext();
    const { exams } = grade;

    return (
        <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {exams.map((exam, index) => (
                        <TableContainer component={Paper} sx={{ borderRadius: 0 }} key={index}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <BorderedTableCellHeader align="center" colSpan={3}>
                                            <Typography fontWeight="600">{exam.month}</Typography>
                                        </BorderedTableCellHeader>
                                    </TableRow>
                                    <TableRow>
                                        <BorderedTableCellHeader>
                                            <Typography>{lang.subject}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader>
                                            <Typography>{lang.note}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader align="center">
                                            <Typography>{lang.date}</Typography>
                                        </BorderedTableCellHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exam.exams.map((details, index2) => (
                                        <TableRow key={index2}>
                                            <BorderedTableCell>
                                                <Typography>{details.subject}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell>
                                                <Typography>{details.note}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell align="center">
                                                <Typography>{details.date}</Typography>
                                            </BorderedTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
