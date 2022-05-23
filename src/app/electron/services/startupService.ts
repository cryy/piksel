import {
    app, BrowserWindowConstructorOptions,
    Menu,
    Notification, screen,
    shell, Tray
} from "electron";
import { BrowserWindow } from "glasstron";
import os from "os";
import path from "path";
import url from "url";
import { ConfigService, IPCService, LangService } from ".";
import { BootFlags, Command } from "../../ipc";


export class StartupService {
    private _ipc: IPCService;
    private _lang: LangService;
    private _config: ConfigService;

    private _window: BrowserWindow | null;
    private _tray: Tray | null;
    private _bootFlags: BootFlags;

    private _started: boolean;
    private _ready: boolean;

    private _iconsPath: string;

    private _macNameMap: Map<number, string[]>;

    constructor(ipc: IPCService, lang: LangService, config: ConfigService) {
        this._ipc = ipc;
        this._lang = lang;
        this._config = config;

        this._window = null;
        this._tray = null;
        this._bootFlags = BootFlags.None;

        this._started = false;
        this._ready = false;

        this._iconsPath = path.join(__dirname, `../build/icons`);

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

    private getIconName(size?: number) {
        const sizeString = size ? `${size}x${size}.png` : undefined;

        switch (os.type()) {
            case "Windows_NT":
                return sizeString ?? "icon.ico";
            case "Linux":
                return sizeString ?? "256x256.png";
            case "Darwin":
                return sizeString ?? "icon.icns";
            default:
                return "";
        }
    }

    private getIconPath(size?: number) {
        return path.join(this._iconsPath, this.getIconName(size));
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

        const widthRatio = Math.round(width / 1.85);
        const heightRatio = Math.round(height / 1.59);

        const windowWidth = widthRatio < 900 ? 900 : widthRatio;
        const windowHeight = heightRatio < 460 ? 460 : heightRatio;

        const browserOptions: BrowserWindowConstructorOptions = {
            width: windowWidth,
            height: windowHeight,
            minWidth: 900,
            minHeight: 460,
            center: true,
            frame: false,
            show: false,
            transparent: os.type() === "Windows_NT" ? false : true,
            webPreferences: {
                nodeIntegration: true,
                devTools: true,
                contextIsolation: false,
            },
            title: "piksel",
            fullscreenable: false,
            icon: this.getIconPath(),
        };

        this._window = new BrowserWindow(browserOptions);

        this.setupBlur();

        if (
            ((this._bootFlags & BootFlags.BlurSupported) === BootFlags.BlurSupported ||
                os.type() === "Linux") &&
            this._config.store.blur
        )
            this.setBlur(true).then((result) => {
                if (!result) this._bootFlags = this._bootFlags | ~BootFlags.BlurSupported;
            });

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

        this._ipc.window = this._window;
        this._config.window = this._window;
    }

    private createTray() {
        this._tray = new Tray(this.getIconPath());
        this._tray.setToolTip("Piksel");
        this._tray.setContextMenu(this.buildContextMenu(true));
    }

    private buildContextMenu(boot: boolean = false) {
        const hidden = boot ? false : !this._window?.isVisible();

        return Menu.buildFromTemplate([
            {
                label: "Piksel",
                type: "normal",
                icon: this.getIconPath(16),
                enabled: false,
            },
            {
                type: "separator",
            },
            {
                label: hidden ? this._lang.current.showPiksel : this._lang.current.minimizeToTray,
                type: "normal",
                click: () => {
                    if (hidden) {
                        this._window?.showInactive();
                        this._window?.moveTop();
                    } else {
                        this._window?.hide();
                    }
                    this._tray?.setContextMenu(this.buildContextMenu());
                },
            },
            {
                label: this._lang.current.exit,
                type: "normal",
                click: () => {
                    this._window?.close();
                },
            },
        ]);
    }

    private async setBlur(b: boolean) {
        try {
            await this._window!.setBlur(b);
            return true;
        } catch {
            return false;
        }
    }

    private setupBlur() {
        if (this._window) {
            switch (os.type()) {
                case "Windows_NT":
                    const ver = os.version();
                    //futureproofing
                    if (ver.startsWith("Windows 10") || ver.startsWith("Windows 11")) {
                        /*
                    blurbehind causes window lag on win11, acrylic causes window lag on win10
                    should do a windows version check however
                    https://github.com/nodejs/node/issues/40862
                    */
                        this._bootFlags = this._bootFlags | BootFlags.BlurSupported;
                        this._window.blurType = "blurbehind";
                    }
                    break;
                case "Darwin":
                    switch (this.getMacVer().version) {
                        case "10.10":
                            this._bootFlags = this._bootFlags | BootFlags.BlurSupported;
                            this._window.vibrancy = "dark";
                            break;
                        case "10.11":
                        case "10.12":
                        case "10.13":
                            this._bootFlags = this._bootFlags | BootFlags.BlurSupported;
                            this._window.vibrancy = "sidebar";
                            break;
                        case "10.14":
                        case "10.15":
                        case "11":
                            this._bootFlags = this._bootFlags | BootFlags.BlurSupported;
                            this._window.vibrancy = "fullscreen-ui";
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    private async ready() {
        await this._ipc.send({
            name: "READY",
            data: {
                config: this._config.store,
                bootFlags: this._bootFlags,
            },
        });
        this._ready = true;
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
                this._window?.hide();
                if (this._config.store.notificationOnClose && Notification.isSupported()) {
                    new Notification({
                        title: this._lang.current.windowNotificationTitle,
                        body: this._lang.current.windowNotificationBody,
                        icon: this.getIconPath(128),
                    }).show();
                    this._config.update("notificationOnClose", false);
                }
                this._tray?.setContextMenu(this.buildContextMenu());
                break;
            case "SHOW":
                setTimeout(() => {
                    this._window?.show();
                }, 500);
                break;
            default:
                break;
        }
    }

    public start() {
        if (!this._started) {
            this._started = true;

            app.on("ready", () => {
                this.createTray();
                setTimeout(this.createWindow.bind(this), process.platform === "linux" ? 1000 : 0);
            });

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
