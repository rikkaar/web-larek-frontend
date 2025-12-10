/**
 * Типы для Order View компонентов
 */

import { ButtonData } from './common';
import { ModalContentData, ModalContentSettings } from './modal';

// ============================================================================
// OrderSuccess (успешный заказ)
// ============================================================================

/**
 * Данные для успешного заказа
 */
export interface OrderSuccessData extends ModalContentData {
	/** Сумма списания */
	total: number;
	/** Кнопка "За новыми покупками" */
	button: ButtonData;
}

/**
 * Настройки для OrderSuccess
 */
export interface OrderSuccessSettings extends ModalContentSettings {
	/** Клик по кнопке */
	onClick: () => void;
}
