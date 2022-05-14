import { Command, Config, ConfigUpdate } from "../../ipc";
import Store, { Schema } from "electron-store";
import { app, nativeTheme } from "electron";

import { BrowserWindow } from "glasstron";
import { IPCService } from ".";

export class ConfigService {
    private _ipc: IPCService;

    private readonly _communicationChannel: string;

    private _schema: Schema<Config>;
    private _store: Store<Config>;

    private _window: BrowserWindow | null;

    constructor(ipc: IPCService) {
        this._ipc = ipc;

        this._communicationChannel = "CONFIG";

        this._schema = this.createSchema();
        this._store = new Store<Config>({
            schema: this._schema,
            clearInvalidConfig: true,
        });

        this._window = null;

        this._ipc.receive<Command, any>(this.ipcHandler.bind(this), this._communicationChannel);
    }

    private createSchema(): Schema<Config> {
        const appLocale = app.getLocale();
        const locale = appLocale === "hr-HR" ? "hr" : "en";
        const themeMode = nativeTheme.shouldUseDarkColors ? "dark" : "light";

        return {
            lang: {
                type: "string",
                enum: ["en", "hr"],
                default: locale,
            },
            theme: {
                type: "string",
                enum: ["dark", "light"],
                default: themeMode,
            },
            notificationOnClose: {
                type: "boolean",
                default: true,
            },
            blur: {
                type: "boolean",
                default: true,
            },
            carnetUsername: {
                type: "string",
                default: "",
            },
            carnetPassword: {
                type: "string",
                default: "",
            },
        };
    }

    private async ipcHandler(command: Command) {
        let d;
        switch (command.name) {
            case "UPDATE":
                d = command.data as ConfigUpdate;
                return await this.handleSetting(d.path, d.value);
        }

        return false;
    }

    private async handleSetting(path: string, value: any) {
        try {
            switch (path) {
                case "blur":
                    value = value as boolean;
                    this._window?.setBlur(value);
                    break;
                default:
                    break;
            }
            this._store.set(path, value);

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async update(path: string, value: any) {
        if (await this.handleSetting(path, value)) {
            this._ipc.send({
                name: "UPDATE",
                data: this.store,
                channel: this._communicationChannel,
            });
            return true;
        }

        return false;
    }

    public get store() {
        return this._store.store as Config;
    }

    public set window(w: BrowserWindow) {
        this._window = w;
    }
}
