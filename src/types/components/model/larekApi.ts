// Типы, поставляемые из API
// Источник: https://larek-api.nomoreparties.co/weblarek.postman.json

export type Brand<T, B extends string> = T & { readonly _brand: B }

export type ProductId = Brand<string, 'ProductId'>;
export type OrderId = Brand<string, 'OrderId'>;

/**
 * Категория продукта
 */
export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка';

/**
 * Способ оплаты
 */
export type PaymentMethod = 'online' | 'cash';

/**
 * Продукт
 */
export interface Product {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number | null;
}

/**
 * Запрос на создание заказа
 */
export interface OrderRequest {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: ProductId[];
}

/**
 * Ответ после создания заказа
 */
export interface OrderResult {
	id: OrderId;
	total: number;
}

/**
 * Интерфейс API для работы с Larek
 */
export interface ILarekApi {
	/**
	 * Получить список продуктов
	 */
	getProducts(): Promise<Product[]>;

	/**
	 * Получить продукт по id
	 * @param id - идентификатор продукта
	 */
	getProduct(id: string): Promise<Product>;

	/**
	 * Создать заказ
	 * @param order - данные заказа
	 */
	createOrder(order: OrderRequest): Promise<OrderResult>;
}
