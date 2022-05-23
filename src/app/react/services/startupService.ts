import { promiseSetRecoil } from "recoil-outside";
import { ConfigService, IPCService, RecoilService } from ".";
import { CarnetUpdateState, Command, EDnevnikDetails, Ready } from "../../ipc";


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
        let d;
        switch (command.name) {
            case "READY":
                d = command.data as Ready;
                this._config.setReady(d);
                
                this._ipc.send({
                    name: "SHOW"
                });
                break;
            case "CARNET_LOADING_STATE":
                d = command.data as CarnetUpdateState;
                promiseSetRecoil(this._recoil.carnetLoadingPhase, d.state);
                break;
            case "EDNEVNIK_UPDATE":
                d = command.data as EDnevnikDetails;
                promiseSetRecoil(this._recoil.ednevnik, d);
                break;
            default:
                break;
        }
    }
}
