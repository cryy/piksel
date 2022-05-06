import { BrowserWindow, app, screen, shell } from "electron";

import path from "path";
import url from "url";

export class StartupService {

    private _window: BrowserWindow | null;

    private _started: boolean;
    private _ready: boolean;

    constructor() {
        this._window = null;

        this._started = false;
        this._ready = false;
    }

    private createWindow() {
        const display = screen.getPrimaryDisplay();

        const { width, height } = display.workAreaSize;

        const r1 = Math.round(width / 1.98);
        const r2 = Math.round(height / 2.14);

        const m_width = r1 < 500 ? 500 : r1;
        const m_height = r2 < 281 ? 281 : r2;


        this._window = new BrowserWindow({
            width: m_width,
            height: m_height,
            minWidth: 500,
            minHeight: 251,
            center: true,
            frame: false,
            show: true,
            transparent: false,
            webPreferences: {
                nodeIntegration: true,
                devTools: true,
            },
            title: "piksel",
            fullscreenable: false,
        });
        
        this._window.webContents.on("will-navigate", (e: any) => {
            e.preventDefault();
        });

        this._window.webContents.on("new-window", (e: any, url: any) => {
            e.preventDefault();
            shell.openExternal(url);
        });

        this._window.on("ready-to-show", () => {
            this.ready();
        });

        this._window.on("closed", () => {
            this._window = null;
        });

        this._window.loadURL(
            `${url.format({
                pathname: path.join(__dirname, "index.html"),
                protocol: "file:",
                slashes: true,
            })}`
        );

    }

    private async ready() {
        console.log("ready")

        this._ready = true;
        this._window?.show();
    }

    public start() {
        if (!this._started) {
            this._started = true;

            app.on("ready", () =>
                setTimeout(
                    this.createWindow.bind(this),
                    process.platform === "linux" ? 1000 : 0
                )
            );

            app.on("window-all-closed", () => {
                app.quit();
            });

            app.on("activate", () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    this.createWindow();
                }
            });

            app.on("second-instance", () => {
                if (this._window) {
                    if (this._window.isMinimized()) this._window.restore();
                    this._window.focus();
                }
            });
        }
    }

}