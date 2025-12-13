/**
 * Типы для Form View компонентов
 */

import { PaymentMethod } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ModalContentData, ModalContentSettings, ModalActionsData } from './modal';

// ============================================================================
// OrderForm (форма заказа — шаг 1)
// ============================================================================

/**
 * Данные для формы заказа
 */
export interface OrderFormData extends ModalContentData {
	payment: PaymentMethod | null;
	address: string;
	button: ButtonData;
	error?: string;
}

/**
 * Настройки для формы заказа
 */
export interface OrderFormSettings extends ModalContentSettings {
	/** View для футера */
	actionsView: IView<ModalActionsData>;
	/** Изменение способа оплаты */
	onPaymentChange: (method: PaymentMethod) => void;
	/** Изменение адреса */
	onAddressChange: (value: string) => void;
	/** Отправка формы */
	onSubmit: () => void;
}

// ============================================================================
// ContactsForm (форма контактов — шаг 2)
// ============================================================================

/**
 * Данные для формы контактов
 */
export interface ContactsFormData extends ModalContentData {
	email: string;
	phone: string;
	button: ButtonData;
	error?: string;
}

/**
 * Настройки для формы контактов
 */
export interface ContactsFormSettings extends ModalContentSettings {
	/** View для футера */
	actionsView: IView<ModalActionsData>;
	/** Изменение email */
	onEmailChange: (value: string) => void;
	/** Изменение телефона */
	onPhoneChange: (value: string) => void;
	/** Отправка формы */
	onSubmit: () => void;
}
