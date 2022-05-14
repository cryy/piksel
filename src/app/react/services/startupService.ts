import { Command, Ready } from "../../ipc";
import { ConfigService, IPCService, RecoilService } from ".";

export class StartupService {
    private _recoil: RecoilService;
    private _ipc: IPCService;
    private _config: ConfigService;

    constructor(recoil: RecoilService, ipc: IPCService, config: ConfigService) {
        this._recoil = recoil;
        this._ipc = ipc;
        this._config = config;

        this._ipc.receive<Command>(this.ipcHandler.bind(this));
    }

    private async ipcHandler(command: Command) {
        switch (command.name) {
            case "READY":
                const d = command.data as Ready;
                this._config.setReady(d);
                
                this._ipc.send({
                    name: "SHOW"
                });
                break;
            default:
                break;
        }
    }
}
