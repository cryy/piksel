import {
    Grid,
    Paper,
    styled,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import { AbsentStatus, Grade } from "../../ipc";
import { useAppContext } from "../hooks";
import { BorderedTableCell } from "./borderedTableCell";
import { BorderedTableCellHeader } from "./borderedTableCellHeader";

export interface GradeViewerAbsencesProps {
    grade: Grade;
}

export interface CircleProps {
    children: React.ReactNode;
}

const Circle = styled(Box)({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
});

function circleStyles(status: AbsentStatus) {
    switch (status) {
        case AbsentStatus.Justified:
            return { backgroundColor: "green" };
        case AbsentStatus.Unjustified:
            return { backgroundColor: "red" };
        case AbsentStatus.Waiting:
            return { backgroundColor: "black" };
        case AbsentStatus.Other:
            return { backgroundColor: "gold" };
        default:
            return { backgroundColor: "gray" };
    }
}

function CircleContainer({ children }: CircleProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                "& > div": {
                    marginRight: "4px",
                },
            }}
        >
            {children}
        </Box>
    );
}

function GradeViewerAbsencesInner({ grade }: GradeViewerAbsencesProps) {
    const { lang } = useAppContext();
    const { absences } = grade;

    return (
        <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid
                item
                xs={10}
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <CircleContainer>
                    <Circle sx={circleStyles(AbsentStatus.Justified)} />
                    <Typography>{lang.justified}: {absences.totalJustified}</Typography>
                </CircleContainer>
                <CircleContainer>
                    <Circle sx={circleStyles(AbsentStatus.Unjustified)} />
                    <Typography>{lang.unjustified}: {absences.totalUnjustified}</Typography>
                </CircleContainer>
                <CircleContainer>
                    <Circle sx={circleStyles(AbsentStatus.Waiting)} />
                    <Typography>{lang.waiting}: {absences.totalWaiting}</Typography>
                </CircleContainer>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} />
            <Grid
                item
                xs={10}
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    margin: "12px 0 24px 0",
                }}
            >
                <CircleContainer>
                    <Circle sx={circleStyles(AbsentStatus.All)} />
                    <Typography>{lang.total}: {absences.total}</Typography>
                </CircleContainer>
                <CircleContainer>
                    <Circle sx={circleStyles(AbsentStatus.Other)} />
                    <Typography>{lang.other}: {absences.totalOther}</Typography>
                </CircleContainer>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={1} />
            <Grid item xs={10}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    {absences.dates.map((absence, index) => (
                        <TableContainer component={Paper} sx={{ borderRadius: 0 }} key={index}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <BorderedTableCellHeader align="center" colSpan={4}>
                                            <Typography fontWeight="600">{absence.date}</Typography>
                                        </BorderedTableCellHeader>
                                    </TableRow>
                                    <TableRow>
                                        <BorderedTableCellHeader width="5%" align="center">
                                            <Typography>{lang.period}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader width="45%">
                                            <Typography>{lang.subject}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader width="5%" align="center">
                                            <Typography>{lang.status}</Typography>
                                        </BorderedTableCellHeader>
                                        <BorderedTableCellHeader width="45%">
                                            <Typography>{lang.reason}</Typography>
                                        </BorderedTableCellHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {absence.details.map((details, index2) => (
                                        <TableRow key={index2}>
                                            <BorderedTableCell width="5%" align="center">
                                                <Typography>{details.period}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell width="45%">
                                                <Typography>{details.subject}</Typography>
                                            </BorderedTableCell>
                                            <BorderedTableCell width="5%" align="center">
                                                <Box
                                                    sx={{
                                                        height: "100%",
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Circle sx={circleStyles(details.status)} />
                                                </Box>
                                            </BorderedTableCell>
                                            <BorderedTableCell width="45%">
                                                <Typography>{details.reason}</Typography>
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

export const GradeViewerAbsences = React.memo(GradeViewerAbsencesInner);
