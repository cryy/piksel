import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    styled,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useState } from "react";
import { Grade } from "../../ipc";
import { useAppContext } from "../hooks";
import { BorderedTableCell } from "./borderedTableCell";
import { BorderedTableCellHeader } from "./borderedTableCellHeader";

export interface GradeViewerScheduleProps {
    grade: Grade;
}

const SizedTableCellHeader = styled(BorderedTableCellHeader)({
    width: "15%",
});

const SizedTableCell = styled(BorderedTableCell)({
    width: "15%",
    height: "128px",
});

export function GradeViewerSchedule({ grade }: GradeViewerScheduleProps) {

    const { lang } = useAppContext();

    const [scheduleType, setScheduleType] = useState<"morning" | "afternoon">("morning");

    const handleChange = (e: any, newScheduleType: "morning" | "afternoon") => {
        setScheduleType(newScheduleType);
    };

    const schedule = grade.schedule[scheduleType];

    return (
        <Grid container spacing={0}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <ToggleButtonGroup
                    color="primary"
                    value={scheduleType}
                    onChange={handleChange}
                    exclusive
                    sx={{
                        marginBottom: "24px",
                    }}
                >
                    <ToggleButton value="morning">{lang.morning}</ToggleButton>
                    <ToggleButton value="afternoon">{lang.afternoon}</ToggleButton>
                </ToggleButtonGroup>
                <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 0, overflowWrap: "anywhere" }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <SizedTableCellHeader
                                    align="center"
                                    sx={{
                                        width: "12%",
                                    }}
                                >
                                    <Typography fontWeight="600">{lang.period}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.mondayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.tuesdayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.wednesdayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.thursdayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.fridayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                                <SizedTableCellHeader align="center">
                                    <Typography fontWeight="600">{lang.saturdayShort.toUpperCase()}</Typography>
                                </SizedTableCellHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.periods.map((period, index) => (
                                <TableRow key={index}>
                                    <SizedTableCell
                                        align="center"
                                        sx={{
                                            width: "10%",
                                        }}
                                    >
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {period}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[0][index]}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[1][index]}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[2][index]}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[3][index]}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[4][index]}
                                        </Typography>
                                    </SizedTableCell>
                                    <SizedTableCell align="center">
                                        <Typography fontSize="0.7rem" fontWeight={600}>
                                            {schedule.days[5][index]}
                                        </Typography>
                                    </SizedTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}
