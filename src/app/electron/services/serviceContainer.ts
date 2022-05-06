import { StartupService } from ".";

export class ServiceContainer {

    private _startup: StartupService;

    constructor() {
        this._startup = new StartupService();
    }

    public get startupService() {
        return this._startup;
    }
}
