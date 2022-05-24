import { ExpandMoreRounded } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    alpha,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { Subject } from "../../ipc";
import { useAppContext } from "../hooks";
import { BorderedTableCell, BorderedTableCellHeader } from ".";

export interface GradeViewerSubjectGradesProps {
    subject: Subject;
}

const months = ["IX", "X", "XI", "XII", "I", "II", "III", "IV", "V", "VI"];

export function GradeViewerSubjectGrades({ subject }: GradeViewerSubjectGradesProps) {
    const { theme, lang } = useAppContext();

    const { gradingElements, notes } = subject;

    const boxShadowOpacity = theme.palette.mode === "dark" ? 0.85 : 0.25;
    const nonInclusive = gradingElements.filter((x) => !x.isInclusive);
    const inclusive = gradingElements.find((x) => x.isInclusive);

    const displayGradingElements = gradingElements.length > 0;
    const displayNotes = notes.length > 0;
    const displayNoDetails = !(displayGradingElements || displayNotes);

    return (
        <Accordion
            sx={{
                boxShadow: `3px 5px 27px -10px rgba(0, 0, 0, ${boxShadowOpacity})`,
            }}
            TransitionProps={{
                unmountOnExit: true,
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                <Typography sx={{ width: "60%", flexShrink: 0, fontWeight: 600 }}>
                    {subject.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>{subject.teacherName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {displayGradingElements ? (
                    <>
                        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {months.map((month) => (
                                            <BorderedTableCellHeader align="center" key={month}>
                                                {month}
                                            </BorderedTableCellHeader>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nonInclusive.map((el) => (
                                        <Fragment key={el.name}>
                                            <TableRow>
                                                <BorderedTableCell align="center" colSpan={10}>
                                                    <Typography>{el.name}</Typography>
                                                </BorderedTableCell>
                                            </TableRow>
                                            <TableRow>
                                                {el.grades.map((grade, index) => (
                                                    <BorderedTableCell align="center" key={index}>
                                                        {grade}
                                                    </BorderedTableCell>
                                                ))}
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                    <TableRow>
                                        <BorderedTableCell align="center" colSpan={10}>
                                            <Typography>{lang.finalGrade.toUpperCase()}</Typography>
                                        </BorderedTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <BorderedTableCell align="center" colSpan={4}>
                                            {inclusive!.grades[0]}
                                        </BorderedTableCell>
                                        <BorderedTableCell align="center" colSpan={6}>
                                            {inclusive!.grades[1]}
                                        </BorderedTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="body1">
                            {lang.gradeAverage}:{" "}
                            <Typography component="span">{subject.average.toFixed(2)}</Typography>
                        </Typography>
                    </>
                ) : undefined}
                {displayNotes ? (
                    <>
                        <Typography
                            variant="h6"
                            sx={{
                                margin: `${displayGradingElements ? "24px" : "0"} 0 12px 0`,
                            }}
                        >
                            {lang.notes}
                        </Typography>
                        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <BorderedTableCellHeader>
                                            <Typography>{lang.note}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader align="center">
                                            <Typography>{lang.date}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader align="center">
                                            <Typography>{lang.grade}</Typography>
                                        </BorderedTableCellHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {notes.map((note, index) => (
                                        <TableRow key={index}>
                                            <BorderedTableCell component="th" scope="row">
                                                <Typography>{note.details}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell align="center">
                                                <Typography>{note.date}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell align="center">
                                                <Typography>{note.grade}</Typography>
                                            </BorderedTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : undefined}
                {displayNoDetails ? <Typography>{lang.noDataEntered}</Typography> : undefined}
            </AccordionDetails>
        </Accordion>
    );
}
