import { StartupService, IPCService } from ".";

export class ServiceContainer {

    private _ipcService: IPCService;
    private _startup: StartupService;

    constructor() {
        this._ipcService = new IPCService();
        this._startup = new StartupService(this._ipcService);
    }

    public get ipc() {
        return this._ipcService;
    }

    public get startupService() {
        return this._startup;
    }

}
