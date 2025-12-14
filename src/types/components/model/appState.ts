/**
 * Типы для модели состояния приложения (AppState)
 */

import { Product, ProductId, PaymentMethod, ILarekApi } from './larekApi';
import { FormErrors } from './appEvents';

/**
 * Данные заказа (шаг 1: оплата + адрес)
 */
export interface OrderData {
	payment: PaymentMethod | null;
	address: string;
}

/**
 * Данные контактов (шаг 2: email + телефон)
 */
export interface ContactsData {
	email: string;
	phone: string;
}

/**
 * Полные данные заказа для отправки на сервер
 */
export interface OrderFullData extends OrderData, ContactsData {
	items: ProductId[];
	total: number;
}

/**
 * Состояния модальных окон
 */
export enum AppStateModals {
	none = 'modal:none',
	product = 'modal:product',
	basket = 'modal:basket',
	order = 'modal:order',
	contacts = 'modal:contacts',
	success = 'modal:success',
}

/**
 * События изменения состояния модели
 */
export enum AppStateChanges {
	products = 'state:products',
	basket = 'state:basket',
	order = 'state:order',
	contacts = 'state:contacts',
	modal = 'state:modal',
}

/**
 * Настройки AppState
 */
export interface AppStateSettings {
	// Функция, которая будет вызываться при изменении состояния
	onChange: (changed: AppStateChanges) => void;
}

/**
 * Интерфейс состояния приложения
 */
export interface IAppState {
	// Каталог
	products: Product[];
	setProducts(products: Product[]): void;
	getProduct(id: ProductId): Product | undefined;

	// Корзина
	basket: ProductId[];
	addToBasket(id: ProductId): void;
	removeFromBasket(id: ProductId): void;
	clearBasket(): void;
	isInBasket(id: ProductId): boolean;
	getBasketTotal(): number;
	getBasketCount(): number;
	getBasketProducts(): Product[];

	// Заказ
	order: OrderData;
	setOrderField(field: keyof OrderData, value: string | PaymentMethod): void;
	validateOrder(): FormErrors;
	isOrderValid(): boolean;

	// Контакты
	contacts: ContactsData;
	setContactsField(field: keyof ContactsData, value: string): void;
	validateContacts(): FormErrors;
	isContactsValid(): boolean;

	// Модальные окна
	openedModal: AppStateModals;
	openModal(modal: AppStateModals): void;

	// Общее
	formErrors: FormErrors;
	clearOrder(): void;
}

/**
 * Конструктор AppState (для DI)
 */
export interface AppStateConstructor {
	new (api: ILarekApi, settings: AppStateSettings): IAppState;
}
