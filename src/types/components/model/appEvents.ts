/**
 * Типы событий приложения
 */

import { ProductId, Product, PaymentMethod } from './larekApi';

// ============================================================================
// UI Events (View → Controller)
// ============================================================================

/**
 * Событие выбора продукта
 */
export interface ProductSelectEvent {
	id: ProductId;
}

/**
 * Событие добавления/удаления продукта в корзину
 */
export interface ProductToggleEvent {
	id: ProductId;
}

/**
 * Событие удаления из корзины
 */
export interface BasketRemoveEvent {
	id: ProductId;
}

/**
 * Событие изменения поля формы
 */
export interface FormInputEvent {
	field: string;
	value: string;
}

/**
 * Событие изменения способа оплаты
 */
export interface PaymentChangeEvent {
	method: PaymentMethod;
}

// ============================================================================
// Model Events (Model → Controller → View)
// ============================================================================

/**
 * Событие изменения списка продуктов
 */
export interface ProductsChangedEvent {
	items: Product[];
}

/**
 * Событие изменения корзины
 */
export interface BasketChangedEvent {
	items: ProductId[];
	total: number;
	count: number;
}

/**
 * Ошибки валидации форм
 */
export interface FormErrors {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
}

/**
 * Событие изменения ошибок валидации
 */
export interface FormErrorsChangedEvent {
	errors: FormErrors;
}

// ============================================================================
// Event Names (константы)
// ============================================================================

/**
 * Имена событий приложения
 * Паттерн: namespace:action
 */
export const AppEvents = {
	// UI Events
	BASKET_OPEN: 'basket:open',
	PRODUCT_SELECT: 'product:select',
	PRODUCT_ADD: 'product:add',
	PRODUCT_REMOVE: 'product:remove',
	BASKET_REMOVE: 'basket:remove',
	BASKET_SUBMIT: 'basket:submit',
	ORDER_INPUT: 'order:input',
	ORDER_SUBMIT: 'order:submit',
	CONTACTS_INPUT: 'contacts:input',
	CONTACTS_SUBMIT: 'contacts:submit',
	SUCCESS_CLOSE: 'success:close',
	MODAL_CLOSE: 'modal:close',

	// Model Events
	PRODUCTS_CHANGED: 'products:changed',
	BASKET_CHANGED: 'basket:changed',
	ORDER_CHANGED: 'order:changed',
	CONTACTS_CHANGED: 'contacts:changed',
	FORM_ERRORS_CHANGED: 'formErrors:changed',
} as const;

/**
 * Тип для имён событий
 */
export type AppEventName = typeof AppEvents[keyof typeof AppEvents];

// ============================================================================
// Event Map (событие → тип данных)
// ============================================================================

/**
 * Маппинг событий на типы данных
 * Используется для типизации EventEmitter
 */
export interface AppEventMap {
	// UI Events (без данных)
	[AppEvents.BASKET_OPEN]: undefined;
	[AppEvents.BASKET_SUBMIT]: undefined;
	[AppEvents.ORDER_SUBMIT]: undefined;
	[AppEvents.CONTACTS_SUBMIT]: undefined;
	[AppEvents.SUCCESS_CLOSE]: undefined;
	[AppEvents.MODAL_CLOSE]: undefined;

	// UI Events (с данными)
	[AppEvents.PRODUCT_SELECT]: ProductSelectEvent;
	[AppEvents.PRODUCT_ADD]: ProductToggleEvent;
	[AppEvents.PRODUCT_REMOVE]: ProductToggleEvent;
	[AppEvents.BASKET_REMOVE]: BasketRemoveEvent;
	[AppEvents.ORDER_INPUT]: FormInputEvent;
	[AppEvents.CONTACTS_INPUT]: FormInputEvent;

	// Model Events
	[AppEvents.PRODUCTS_CHANGED]: ProductsChangedEvent;
	[AppEvents.BASKET_CHANGED]: BasketChangedEvent;
	[AppEvents.ORDER_CHANGED]: undefined; // данные берутся из AppState
	[AppEvents.CONTACTS_CHANGED]: undefined;
	[AppEvents.FORM_ERRORS_CHANGED]: FormErrorsChangedEvent;
}

