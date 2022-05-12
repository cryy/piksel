import { Button, TextField } from "@mui/material";

import React from "react";
import { useAppContext } from "../hooks";
import { useSetRecoilState } from "recoil";

export function HourChanger() {
    const { setHour } = useAppContext();

    const [hours, setHours] = React.useState<string>("");

    return (
        <div style={{ display: "flex" }}>
            <TextField id="hours" label="Hours" value={hours} onChange={(e) => setHours(e.target.value)} />
            <Button variant="contained" onClick={() => {
                setHour(Number.parseInt(hours))
            }}>Change</Button>
        </div>
    );
}