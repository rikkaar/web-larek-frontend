import { ProductId, Product, PaymentMethod } from './larekApi';

export interface ProductSelectEvent {
	id: ProductId;
}

export interface ProductToggleEvent {
	id: ProductId;
}

export interface BasketRemoveEvent {
	id: ProductId;
}

export interface FormInputEvent {
	field: string;
	value: string;
}

export interface PaymentChangeEvent {
	method: PaymentMethod;
}

export interface ProductsChangedEvent {
	items: Product[];
}

export interface BasketChangedEvent {
	items: ProductId[];
	total: number;
	count: number;
}

export interface FormErrors {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
}

export interface FormErrorsChangedEvent {
	errors: FormErrors;
}

export const AppEvents = {
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

	PRODUCTS_CHANGED: 'products:changed',
	BASKET_CHANGED: 'basket:changed',
	ORDER_CHANGED: 'order:changed',
	CONTACTS_CHANGED: 'contacts:changed',
	FORM_ERRORS_CHANGED: 'formErrors:changed',
} as const;

export type AppEventName = (typeof AppEvents)[keyof typeof AppEvents];

export interface AppEventMap {
	[AppEvents.BASKET_OPEN]: undefined;
	[AppEvents.BASKET_SUBMIT]: undefined;
	[AppEvents.ORDER_SUBMIT]: undefined;
	[AppEvents.CONTACTS_SUBMIT]: undefined;
	[AppEvents.SUCCESS_CLOSE]: undefined;
	[AppEvents.MODAL_CLOSE]: undefined;

	[AppEvents.PRODUCT_SELECT]: ProductSelectEvent;
	[AppEvents.PRODUCT_ADD]: ProductToggleEvent;
	[AppEvents.PRODUCT_REMOVE]: ProductToggleEvent;
	[AppEvents.BASKET_REMOVE]: BasketRemoveEvent;
	[AppEvents.ORDER_INPUT]: FormInputEvent;
	[AppEvents.CONTACTS_INPUT]: FormInputEvent;

	[AppEvents.PRODUCTS_CHANGED]: ProductsChangedEvent;
	[AppEvents.BASKET_CHANGED]: BasketChangedEvent;
	[AppEvents.ORDER_CHANGED]: undefined;
	[AppEvents.CONTACTS_CHANGED]: undefined;
	[AppEvents.FORM_ERRORS_CHANGED]: FormErrorsChangedEvent;
}
