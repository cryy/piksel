import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CarnetLoginDetails, LoadingPhase, TaskPriority } from "../../ipc";
import { useAppContext } from "../hooks";

export function TaskCreatorInput() {
    const {
        lang,
        services: { recoil, ipc },
    } = useAppContext();

    const location = useLocation();
    const navigator = useNavigate();

    const setTasks = useSetRecoilState(recoil.tasks);

    const [name, setName] = React.useState<string | undefined>(undefined);
    const [description, setDescription] = React.useState<string | undefined>(undefined);
    const [priority, setPriority] = React.useState<TaskPriority>(TaskPriority.Normal);

    //set of rules in order to create a task
    const canCreate = name !== undefined && name.length > 0 && name.trim();

    const handleCreate = () => {
        if (canCreate) {
            setTasks((old) => [
                ...old,
                {
                    id: Date.now(),
                    name: name,
                    description: description,
                    done: false,
                    priority: priority,
                },
            ]);

            setName(undefined);
            setDescription(undefined);
            setPriority(TaskPriority.Normal);
            navigator("/tasks");
        }
    };

    const handleText = (event: any, name: boolean) => {
        const v = event.target.value;
        if (name) {
            if (v.length <= 68) setName(event.target.value);
        } else if (v.length <= 512) setDescription(event.target.value);
    };

    const handlePriority = (e: any) => {
        setPriority(parseInt(e.target.value));
    };

    return (
        <Paper
            sx={{
                maxWidth: "clamp(746px, 68vw, 986px)",
                width: "clamp(746px, 68vw, 986px)",
            }}
        >
            <Grid container spacing={0}>
                <Grid item xs={1} />
                <Grid item xs={10} display="flex">
                    <Grid container spacing={0}>
                        <Grid item xs={12} display="flex" flexDirection="column" margin="24px 0">
                            <Box
                                sx={{
                                    marginBottom: "26px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    Task name *
                                </Typography>
                                <Grid container spacing={0}>
                                    <Grid item xs={1} />
                                    <Grid item xs={10}>
                                        <TextField
                                            autoFocus
                                            value={name}
                                            onChange={(e) => handleText(e, true)}
                                            sx={{
                                                width: "clamp(418px, 100%, 600px)",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={1} />
                                </Grid>
                            </Box>

                            <Box
                                sx={{
                                    marginBottom: "26px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    Task Description
                                </Typography>
                                <Grid container spacing={0}>
                                    <Grid item xs={1} />
                                    <Grid item xs={10}>
                                        <TextField
                                            multiline
                                            rows={4}
                                            value={description}
                                            onChange={(e) => handleText(e, false)}
                                            sx={{
                                                width: "clamp(418px, 100%, 600px)",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={1} />
                                </Grid>
                            </Box>

                            <Box
                                sx={{
                                    marginBottom: "26px",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    Task Priority *
                                </Typography>
                                <Grid container spacing={0}>
                                    <Grid item xs={1} />
                                    <Grid item xs={10}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                name="position"
                                                defaultValue="bottom"
                                                value={priority}
                                                onChange={handlePriority}
                                                sx={{
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <FormControlLabel
                                                    value={TaskPriority.Low}
                                                    control={<Radio color="primary" />}
                                                    label="Low"
                                                />
                                                <FormControlLabel
                                                    value={TaskPriority.Normal}
                                                    control={<Radio color="primary" />}
                                                    label="Normal"
                                                />
                                                <FormControlLabel
                                                    value={TaskPriority.High}
                                                    control={<Radio color="primary" />}
                                                    label="High"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1} />
                                </Grid>
                            </Box>

                            <Button
                                variant="contained"
                                disabled={!canCreate}
                                onClick={handleCreate}
                                sx={{
                                    width: "clamp(418px, 100%, 600px)",
                                    margin: "auto",
                                }}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Paper>
    );
}
