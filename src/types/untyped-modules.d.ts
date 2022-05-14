declare module 'electron-frameless-window-plugin';
declare module 'recoil-outside' {
    import { RecoilValue } from 'recoil';
    export function promiseSetRecoil<T>(recoilObj: RecoilValue<T>, value: T): Promise<RecoilValue<T>>;
    export function promiseGetRecoil<T>(recoilObj: RecoilValue<T>): Promise<T>;
    export default function RecoilOutside(): React.ReactElement;
}
declare module 'glasstron' {
    import { BrowserWindow as Electron_BrowserWindow } from 'electron';
    export class BrowserWindow extends Electron_BrowserWindow {
        setBlur(value: boolean): Promise<boolean>;
        getBlur(): Promise<boolean>;
        blurType: string;
        vibrancy: string;
    }
}