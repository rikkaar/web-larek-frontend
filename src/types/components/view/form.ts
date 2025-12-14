/**
 * Типы для Form View компонентов
 */

import { FormFieldConfig } from './formField';
import { ButtonData } from './button';
import { ModalScreenSettings } from './screen';
import { PaymentMethod } from '@/types/components/model/larekApi';

// ============================================================================
// Ключи полей форм
// ============================================================================

/** Ключи полей формы заказа */
export type OrderFormField = 'address';

/** Ключи полей формы контактов */
export type ContactsFormField = 'email' | 'phone';

// ============================================================================
// FormView (базовый класс форм)
// ============================================================================

/**
 * Настройки для базовой формы
 */
export interface FormViewSettings<K extends string> {
	/** Конфигурация полей */
	fields: FormFieldConfig<K>[];
	/** Селектор кнопки submit */
	submitButtonSelector: string;
	/** Селектор ошибки */
	errorSelector: string;
	/** Callback изменения поля */
	onFieldChange: (field: K, value: string) => void;
	/** Callback отправки формы */
	onSubmit: () => void;
}

/**
 * Данные для базовой формы
 */
export interface FormViewData {
	error?: string;
	button?: ButtonData;
}

// ============================================================================
// OrderFormView (форма заказа)
// ============================================================================

/**
 * Данные для формы заказа
 */
export interface OrderFormData extends FormViewData {
	payment: PaymentMethod | null;
}

/**
 * Настройки для формы заказа
 */
export interface OrderFormSettings extends FormViewSettings<OrderFormField> {
	/** Селектор кнопки "Онлайн" */
	onlineButtonSelector: string;
	/** Селектор кнопки "При получении" */
	cashButtonSelector: string;
	/** CSS-класс активной кнопки оплаты */
	paymentActiveClass: string;
	/** Callback изменения способа оплаты */
	onPaymentChange: (method: PaymentMethod) => void;
}

// ============================================================================
// OrderScreen (экран формы заказа)
// ============================================================================

/**
 * Настройки OrderScreen = методы Controller
 */
export interface OrderScreenSettings extends ModalScreenSettings {
	onPaymentChange: (method: PaymentMethod) => void;
	onFieldChange: (field: OrderFormField, value: string) => void;
	onSubmit: () => void;
}

/**
 * Данные для OrderScreen
 */
export interface OrderScreenData {
	payment: PaymentMethod | null;
	error?: string;
	valid: boolean;
	isActive?: boolean;
}

// ============================================================================
// ContactsScreen (экран формы контактов)
// ============================================================================

/**
 * Настройки ContactsScreen = методы Controller
 */
export interface ContactsScreenSettings extends ModalScreenSettings {
	onFieldChange: (field: ContactsFormField, value: string) => void;
	onSubmit: () => void;
}

/**
 * Данные для ContactsScreen
 */
export interface ContactsScreenData {
	error?: string;
	valid: boolean;
	isActive?: boolean;
}
