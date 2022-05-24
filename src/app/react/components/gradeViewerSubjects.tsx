import { Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";
import { GradeViewerSubjectGrades } from "./gradeViewerSubjectGrades";

export interface GradeViewerSubjectsProps {
    grade: Grade;
}

export function GradeViewerSubjects({ grade }: GradeViewerSubjectsProps) {
    const { lang } = useAppContext();

    const subjects = grade.subjects;

    return (
        <Grid container spacing={0}>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography fontWeight="600">{lang.finalAverage}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography fontWeight="600">{lang.calculatedAverage}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Tooltip title={lang.calculatedAverageOnAveragesTooltip} arrow>
                    <Typography fontWeight="600">{lang.calculatedAverageOnAverages}</Typography>
                </Tooltip>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>{grade.passingGrade}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>{grade.calculatedGrade.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography>{grade.calculatedGradeBasedOnAverages.toFixed(2)}</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    marginTop: "24px",
                    marginBottom: "12px",
                }}
            />
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {subjects.map((subject) => (
                        <GradeViewerSubjectGrades key={subject.name} subject={subject} />
                    ))}
                </Box>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
