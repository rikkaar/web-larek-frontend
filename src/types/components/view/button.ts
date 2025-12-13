import { IClickable } from '@/types/components/base/view';

/**
 * Данные для кнопки
 */
export interface ButtonData {
	label: string;
	disabled?: boolean;
}

/**
 * Настройки для кнопки.
 * T — тип данных, передаваемых в обработчик onClick (например, ProductId)
 */
export type ButtonSettings<T = void> = IClickable<T>;

