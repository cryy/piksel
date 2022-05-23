import { cloneDeep } from "lodash";
import { get, has, set } from "object-path";
import { RecoilState } from "recoil";
import { promiseSetRecoil } from "recoil-outside";
import { IPCService, RecoilService } from ".";
import { Command, Config, ConfigUpdate, LanguageType, Ready, ThemeMode } from "../../ipc";


export class ConfigService {
    private _ipc: IPCService;
    private _recoil: RecoilService;

    private readonly _communicationChannel: string;
    private readonly _ignoreConfigValues: string[];

    private _config: Config | null;

    private _setTheme: ((mode: ThemeMode) => void) | null;
    private _setLang: ((lang: LanguageType) => void) | null;

    constructor(ipc: IPCService, recoil: RecoilService) {
        this._ipc = ipc;
        this._recoil = recoil;

        this._communicationChannel = "CONFIG";
        this._ignoreConfigValues = ["_lang", "_theme"];

        this._config = null;

        this._setTheme = null;
        this._setLang = null;

        this._ipc.receive<Command>(this.ipcHandler.bind(this), this._communicationChannel);
    }

    private async ipcHandler(command: Command) {
        let d;
        switch (command.name) {
            case "UPDATE":
                d = command.data as Config;
                this.setConfig(d);
                break;
        }
    }

    private async updateStates(path: string) {
        const c = this._config!;

        if (path === "lang") {
            if (this._setLang) this._setLang(c.lang);
            return;
        } else if (path === "theme") {
            if (this._setTheme) this._setTheme(c.theme);
            return;
        }

        if (!has(this._recoil, `_${path}`)) return;
        if (!has(c, path)) return;

        const atom = get(this._recoil, `_${path}`) as RecoilState<unknown>;
        const value = get(c, path);

        await promiseSetRecoil(atom, value);
    }

    private setFromPath(o: any, path: string, value: any) {
        let object = cloneDeep(o);
        set(object, path, value);
        this._config = object;
    }

    public setConfig(c: Config) {
        if (this._setLang) this._setLang(c.lang);
        if (this._setTheme) this._setTheme(c.theme);

        for (const [s, settingValue] of Object.entries(c)) {
            const setting = `_${s}`;
            if (this._ignoreConfigValues.includes(setting)) continue;
            if (!has(this._recoil, setting)) continue;
            
            const atom = get(this._recoil, setting) as RecoilState<unknown>;
            promiseSetRecoil(atom, settingValue);
        }

        this._config = c;
    }

    public setReady(r: Ready) {
        promiseSetRecoil(this._recoil.bootFlags, r.bootFlags);
        this.setConfig(r.config);
    }

    public async set(path: string, value: any) {
        const r = await this._ipc.send<ConfigUpdate, boolean>({
            name: "UPDATE",
            channel: this._communicationChannel,
            data: {
                path: path,
                value: value,
            },
        });

        if (r) {
            this.setFromPath(this._config!, path, value);
            await this.updateStates(path);
        }

        return r;
    }

    public get config() {
        return this._config!;
    }

    public set theme(func: (mode: ThemeMode) => void) {
        this._setTheme = func;
    }

    public set lang(func: (lang: LanguageType) => void) {
        this._setLang = func;
    }
}
