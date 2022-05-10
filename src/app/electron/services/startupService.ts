import { app, BrowserWindowConstructorOptions, screen, shell } from "electron";

import { BrowserWindow } from "glasstron";
import os from "os";
import path from "path";
import url from "url";
import { Command } from "../../ipc";
import { IPCService } from ".";
import { plugin } from "electron-frameless-window-plugin";

export class StartupService {
    private _ipc: IPCService;

    private _window: BrowserWindow | null;

    private _started: boolean;
    private _ready: boolean;

    private _macNameMap: Map<number, string[]>;

    constructor(ipc: IPCService) {
        this._ipc = ipc;

        this._window = null;

        this._started = false;
        this._ready = false;

        this._macNameMap = new Map([
            [20, ["Big Sur", "11"]],
            [19, ["Catalina", "10.15"]],
            [18, ["Mojave", "10.14"]],
            [17, ["High Sierra", "10.13"]],
            [16, ["Sierra", "10.12"]],
            [15, ["El Capitan", "10.11"]],
            [14, ["Yosemite", "10.10"]],
            [13, ["Mavericks", "10.9"]],
            [12, ["Mountain Lion", "10.8"]],
            [11, ["Lion", "10.7"]],
            [10, ["Snow Leopard", "10.6"]],
            [9, ["Leopard", "10.5"]],
            [8, ["Tiger", "10.4"]],
            [7, ["Panther", "10.3"]],
            [6, ["Jaguar", "10.2"]],
            [5, ["Puma", "10.1"]],
        ]);

        this._ipc.receive<Command>(this.ipcHandler.bind(this));
    }

    private getMacVer(release?: any) {
        release = Number((release || os.release()).split(".")[0]);

        const [name, version] = this._macNameMap.get(release) as any;

        return {
            name,
            version,
        };
    }

    private createWindow() {
        const display = screen.getPrimaryDisplay();

        const { width, height } = display.workAreaSize;

        const r1 = Math.round(width / 1.98);
        const r2 = Math.round(height / 2.14);

        console.log(os.type());
        console.log(os.platform());
        console.log(os.release());
        const m_width = r1 < 500 ? 500 : r1;
        const m_height = r2 < 281 ? 281 : r2;

        const browserOptions: BrowserWindowConstructorOptions = {
            width: m_width,
            height: m_height,
            minWidth: 500,
            minHeight: 251,
            center: true,
            frame: false,
            show: false,
            transparent: false,
            webPreferences: {
                nodeIntegration: true,
                devTools: true,
                contextIsolation: false,
            },
            title: "piksel",
            fullscreenable: false,
        };

        this._window = new BrowserWindow(browserOptions);

        this.blur();

        /*
        currently buggy with this electron version
        plugin({
            browserWindow: this._window,
            options: browserOptions
        });
        */

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

    private async setBlur(b: boolean) {
        try {
            await this._window!.setBlur(b);
        } catch {}
    }

    private blur() {
        if (this._window) {
            switch (os.type()) {
                case "Windows_NT":
                    /*
                    blurbehind causes window lag on win11, acrylic causes window lag on win10
                    should do a windows version check however
                    https://github.com/nodejs/node/issues/40862
                    */
                    this._window.blurType = "blurbehind";
                    break;
                case "Darwin":
                    switch (this.getMacVer().version) {
                        case "10.10":
                            this._window.vibrancy = "dark";
                            break;
                        case "10.11":
                        case "10.12":
                        case "10.13":
                            this._window.vibrancy = "sidebar";
                            break;
                        case "10.14":
                        case "10.15":
                        case "11":
                            this._window.vibrancy = "fullscreen-ui";
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            this.setBlur(true);
        }
    }

    private async ready() {
        console.log("ready");

        this._ready = true;
        this._window?.show();
    }

    private async ipcHandler(command: Command) {
        switch (command.name) {
            case "WIN_MAX":
                if (this._window?.isMaximized()) {
                    this._window?.unmaximize();
                } else {
                    if (this._window?.isMaximizable()) {
                        this._window?.maximize();
                    }
                }
                break;
            case "WIN_MIN":
                if (this._window?.isMinimizable()) this._window.minimize();
                break;
            case "WIN_CLS":
                this._window?.close();
                break;
            case "SHOW":
                setTimeout(() => {
                    this._window?.show();
                }, 2100);
                break;
            default:
                break;
        }
    }

    public start() {
        if (!this._started) {
            this._started = true;

            app.on("ready", () =>
                setTimeout(this.createWindow.bind(this), process.platform === "linux" ? 1000 : 0)
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
