declare module 'electron-frameless-window-plugin';
declare module 'glasstron' {
    import { BrowserWindow as Electron_BrowserWindow } from 'electron';
    export class BrowserWindow extends Electron_BrowserWindow {
        setBlur(value: boolean): Promise<boolean>;
        getBlur(): Promise<boolean>;
        blurType: string;
        vibrancy: string;
    }
}