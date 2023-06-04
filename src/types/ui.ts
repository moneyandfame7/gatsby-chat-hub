import type {AuthParams} from './../api/stores/auth';

export enum LeftColumnContent {}
export enum LeftColumnContentGroup {}

export enum RightColumnContent {}

export enum SettingsContent {}

export enum AppScreens {
	Auth,
	Main,
	Lock,
}

export enum AuthScreens {
	WaitPhoneNumber,
	WaitPincode,
	WaitPassword,
}
export interface WithAuthProps {
	handleUpdateParams: (params: AuthParams) => void;
	isLoading: boolean;
}
