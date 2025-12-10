/**
 * Типы для модели состояния приложения (AppState)
 */

import { Product, ProductId, PaymentMethod } from './larekApi';
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

	// Заказ
	order: OrderData;
	setOrderField(field: keyof OrderData, value: string | PaymentMethod): void;
	validateOrder(): FormErrors;

	// Контакты
	contacts: ContactsData;
	setContactsField(field: keyof ContactsData, value: string): void;
	validateContacts(): FormErrors;

	// Общее
	formErrors: FormErrors;
	clearOrder(): void;
}
