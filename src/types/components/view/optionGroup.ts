import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

interface Option<T> {
	value: T;

	view: IView<ButtonData>;
}

export interface OptionGroupData<T> {
	selected: T | null;
}

export interface OptionGroupSettings<T> {
	options: Option<T>[];

	onSelect: (value: T) => void;
}
