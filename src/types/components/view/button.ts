import { IClickable } from '@/types/components/base/view';

/**
 * Данные для кнопки
 */
export interface ButtonData {
	label: string;
	disabled?: boolean;
	active?: boolean;
}

/**
 * Настройки для кнопки.
 * T — тип данных, передаваемых в обработчик onClick (например, ProductId)
 */
export interface ButtonSettings<T = void> extends IClickable<T> {
	/** CSS-класс для активного состояния (опционально) */
	activeClass?: string;
}

