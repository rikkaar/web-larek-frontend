import { IClickable } from '@/types/components/base/view';

export interface ButtonData {
	label: string;
	disabled?: boolean;
	active?: boolean;
}

export interface ButtonSettings<T = void> extends IClickable<T> {
	activeClass?: string;
}
