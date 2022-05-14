import { LanguageType, ThemeMode } from ".";

export interface Config {
    lang: LanguageType;
    theme: ThemeMode;
    notificationOnClose: boolean;
    blur: boolean;
    carnetUsername: string;
    carnetPassword: string;
}
