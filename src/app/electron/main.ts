import { BrowserWindow, app, dialog, screen, shell } from "electron";

import path from "path";
import url from "url";

app.on("ready", () => {
    const display = screen.getPrimaryDisplay();

    const { width, height } = display.workAreaSize;

    const r1 = Math.round(width / 1.98);
    const r2 = Math.round(height / 2.14);

    const m_width = r1 < 500 ? 500 : r1;
    const m_height = r2 < 281 ? 281 : r2;

    const browserWindow = new BrowserWindow({
        width: m_width,
        height: m_height,
        minWidth: 500,
        minHeight: 251,
        center: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
        },
        title: "piksel",
        fullscreenable: false,
    });

    browserWindow.webContents.on("will-navigate", (e: any) => {
        e.preventDefault();
    });

    browserWindow.webContents.on("new-window", (e: any, url: any) => {
        e.preventDefault();
        shell.openExternal(url);
    });

    browserWindow.on("ready-to-show", () => {
        browserWindow.show();
    });

    browserWindow.loadURL(
        `${url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })}`
    );

    browserWindow.on("closed", () => {});
});
