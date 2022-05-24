import { app } from "electron";
import { ServiceContainer } from "./services";
import { autoUpdater } from "electron-updater";

const lock = app.requestSingleInstanceLock();

if (!lock) app.quit();
else {
    if (process.platform === "win32") {
        app.setAppUserModelId(app.name);
    }

    autoUpdater.checkForUpdatesAndNotify();

    const services = new ServiceContainer();

    services.startup.start();
}
