import {
    Callback,
    Command,
    CommandReceiver,
    ReceiverCallback,
} from "../../ipc";

import { BrowserWindow } from 'electron';
import { ipcMain } from 'electron-better-ipc';

export class IPCService {
    private readonly _channel = "COMMAND";

    private _channelSubscribers: ReceiverCallback<any, any>[];
    private _window: BrowserWindow | null;

    constructor() {
        this._window = null;
        this._channelSubscribers = [];

        ipcMain.answerRenderer<unknown, void>(this._channel, (d, browser) => {
            for (const callback of this._channelSubscribers)
                callback(d, browser);
        });
    }

    public set window(w: BrowserWindow) {
        this._window = w;
    }

    public send<T = undefined>(command: Command): Promise<T> {
        return ipcMain.callRenderer<Command, T>(
            this._window!,
            command.channel ?? this._channel,
            command
        );
    }

    public receive<T, T2 = void>(
        callback: ReceiverCallback<T, T2>,
        channel = this._channel
    ): CommandReceiver {
        if (channel === this._channel) {
            this._channelSubscribers.push(callback);
            const remover = () => {
                this._channelSubscribers.splice(
                    this._channelSubscribers.indexOf(callback),
                    1
                );
            };
            remover.bind(this);

            return {
                channel: channel,
                remove: remover,
            };
        }

        const remover = ipcMain.answerRenderer<T, Callback<T2>>(
            channel,
            callback
        );

        return {
            channel: channel,
            remove: remover,
        };
    }
}
