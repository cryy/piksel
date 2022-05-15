import { Command, SnackbarData } from '../../ipc';
import React, { useEffect } from 'react'

import { useAppContext } from '../hooks';
import { useSnackbar } from 'notistack'

export function SnackbarListener() {

    const { services: { ipc }} = useAppContext();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        
        const remover = ipc.receive((command: Command) => {
            if(command.name === "SNACKBAR") {
                const data = command.data as SnackbarData;
                enqueueSnackbar(data.message, data.options);
            }
        });

        return () => {
            remover.remove();
        }
    }, []);
    
    
  return (
    <></>
  )
}
