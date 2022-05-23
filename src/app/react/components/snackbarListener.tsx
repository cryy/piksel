import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Command, SnackbarData } from "../../ipc";
import { useAppContext } from "../hooks";


export function SnackbarListener() {
    const {
        services: { ipc },
        lang,
    } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const remover = ipc.receive((command: Command) => {
            if (command.name === "SNACKBAR") {
                const data = command.data as SnackbarData;
                enqueueSnackbar(data.useLang ? lang[data.message] : data.message, data.options);
            }
        });

        return () => {
            remover.remove();
        };
    }, [lang]);

    return <></>;
}
