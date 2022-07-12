import { AddCircleRounded } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IncompletedTasks, CompletedTasks, TaskStats, TaskViewer } from "../components";
import { useAppContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export function Tasks() {
    const {
        lang,
        services: {
            recoil: { displayLocation, activeBreadcrumbs },
        },
    } = useAppContext();

    const navigator = useNavigate();

    const location = useRecoilValue(displayLocation);
    const setBreadcrumbs = useSetRecoilState(activeBreadcrumbs);

    const handleClick = (e: any) => {
        navigator("/tasks/create");
    };

    React.useEffect(() => {
        if (location?.pathname === "/tasks") {
            setBreadcrumbs([
                {
                    name: "tasksPage",
                    link: "/tasks",
                    useLang: true,
                    subroute: false,
                },
            ]);
        }
    }, [location]);

    return (
        <>
            <TaskViewer />
            <Grid container spacing={0} marginBottom="64px">
                <Grid item xs={1} />
                <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
                    <Grid container spacing={0}>
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                sx={{
                                    width: "80%",
                                }}
                            >
                                {lang.createNewTask}
                            </Button>
                            <TaskStats />
                        </Grid>
                        <Grid item xs={12} marginBottom="64px">
                            <IncompletedTasks />
                        </Grid>
                        <Grid item xs={12}>
                            <CompletedTasks />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </>
    );
}
