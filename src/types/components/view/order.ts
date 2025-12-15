import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';

export interface OrderSuccessData {
	total: number;
	button: ButtonData;
}

export interface OrderSuccessSettings {
	descriptionSelector: string;
	buttonView: IView<ButtonData>;
	formatTotal: (value: number) => string;
}

export type SuccessScreenSettings = ModalScreenSettings;

export interface SuccessScreenData {
	total: number;
	isActive?: boolean;
}
