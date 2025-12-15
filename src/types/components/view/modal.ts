import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

export interface ModalTitleData {
	title: string;
}

export interface ModalActionsData {
	button: ButtonData;
	secondary?: string;
}

export interface ModalActionsSettings {
	buttonView: IView<ButtonData>;

	secondarySelector: string;
}

export interface ModalData {
	content: HTMLElement | null;
}

export interface ModalSettings {
	onClose: () => void;
}

export interface ModalViewSettings extends ModalSettings {
	closeSelector: string;

	contentSelector: string;

	activeClass: string;
}

export interface IModal {
	open(): void;
	close(): void;
	setContent(content: HTMLElement): void;
}

export interface ModalContentData {
	title?: string;
}

export interface ModalContentSettings {
	titleView?: IView<ModalTitleData>;

	actionsView?: IView<ModalActionsData>;
}

export interface IModalContent<D extends ModalContentData> {
	element: HTMLElement;
	render(data?: Partial<D>): HTMLElement;
}
