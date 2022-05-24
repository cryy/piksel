import { app } from "electron";
import { ServiceContainer } from "./services";

const lock = app.requestSingleInstanceLock();

if (!lock) app.quit();
else {
    if (process.platform === "win32") {
        app.setAppUserModelId(app.name);
    }
    
    const services = new ServiceContainer();

    services.startup.start();
}
