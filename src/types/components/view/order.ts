/**
 * Типы для Order View компонентов
 */

import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';

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

// ============================================================================
// SuccessScreen (экран успешного заказа)
// ============================================================================

/**
 * Настройки SuccessScreen = методы Controller
 */
export interface SuccessScreenSettings extends ModalScreenSettings {
	// только onClose из ModalScreenSettings
}

/**
 * Данные для SuccessScreen
 */
export interface SuccessScreenData {
	total: number;
	isActive?: boolean;
}
