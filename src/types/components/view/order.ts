/**
 * Типы для Order View компонентов
 */

import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

// ============================================================================
// OrderSuccess (успешный заказ)
// ============================================================================

/**
 * Данные для успешного заказа
 */
export interface OrderSuccessData {
	/** Сумма списания */
	total: number;
	/** Кнопка "За новыми покупками" */
	button: ButtonData;
}

/**
 * Настройки для OrderSuccess
 */
export interface OrderSuccessSettings {
	/** Селектор описания (сумма) */
	descriptionSelector: string;
	/** Инжектированный View кнопки */
	buttonView: IView<ButtonData>;
	/** Функция форматирования суммы */
	formatTotal: (value: number) => string;
}
