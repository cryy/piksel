import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAppContext } from "../hooks";
import { getPriorityString, getPriorityStyling } from "./taskPreview";
import { WarningRounded } from "@mui/icons-material";
import { TaskPriority } from "../../ipc";

export function TaskViewer() {
    const {
        services: { recoil },
        lang,
    } = useAppContext();

    const [taskId, setTaskId] = useRecoilState(recoil.openTaskId);
    const [tasks, setTasks] = useRecoilState(recoil.tasks);

    const taskIndex = tasks.findIndex((x) => x.id === taskId);
    const task = taskIndex === -1 ? null : tasks[taskIndex];

    const handleDelete = () => {
        setTaskId(null);
        setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
    };

    const handleClose = () => {
        setTaskId(null);
    };

    return (
        <Dialog open={Boolean(task)} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Tooltip
                    title={`${getPriorityString(task?.priority ?? TaskPriority.Normal, lang)}`}
                >
                    <span>
                        <WarningRounded
                            sx={{
                                color: getPriorityStyling(task?.priority ?? TaskPriority.Normal),
                                verticalAlign: "middle"
                            }}
                        />
                    </span>
                </Tooltip>{" "}
                {task?.name}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">{task?.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleDelete} color="primary" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
