import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Grade } from "../../ipc";

export interface GradeViewerNotesProps {
    grade: Grade;
}

export function GradeViewerNotes({ grade }: GradeViewerNotesProps) {
    const { notes } = grade;

    return (
        <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {notes.map((note) => (
                        <Box key={note.title} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="h6" fontWeight="600">
                                {note.title}
                            </Typography>
                            <Typography variant="body1">{note.content}</Typography>
                        </Box>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
