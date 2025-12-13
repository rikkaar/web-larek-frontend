/**
 * Типы для OptionGroup View — универсальный выбор одной опции из нескольких
 */

import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

/**
 * Опция для группы
 */
export interface Option<T> {
	/** Значение опции */
	value: T;
	/** View кнопки для этой опции (уже с onClick) */
	view: IView<ButtonData>;
}

/**
 * Данные для группы опций
 */
export interface OptionGroupData<T> {
	/** Текущее выбранное значение */
	selected: T | null;
}

/**
 * Настройки для группы опций
 */
export interface OptionGroupSettings<T> {
	/** Массив опций */
	options: Option<T>[];
	/** Callback при выборе опции */
	onSelect: (value: T) => void;
}

