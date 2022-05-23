
export interface Command<T = any> {
    name: string;
    data?: T;
    channel?: string;
}