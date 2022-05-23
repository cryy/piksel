import {
    Grid
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Grade } from "../../ipc";
import { GradeViewerSubjectGrades } from "./gradeViewerSubjectGrades";


export interface GradeViewerSubjectsProps {
    grade: Grade;
}

export function GradeViewerSubjects({ grade }: GradeViewerSubjectsProps) {
    const subjects = grade.subjects;

    return (
        <Grid container spacing={0}>
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
