// Типы, поставляемые из API
// Источник: https://larek-api.nomoreparties.co/weblarek.postman.json

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
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number | null;
}

/**
 * Запрос на создание заказа
 */
export interface IOrderRequest {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

/**
 * Ответ после создания заказа
 */
export interface IOrderResult {
	id: string;
	total: number;
}

/**
 * Интерфейс API для работы с Larek
 */
export interface ILarekApi {
	/**
	 * Получить список продуктов
	 */
	getProducts(): Promise<IProduct[]>;

	/**
	 * Получить продукт по id
	 * @param id - идентификатор продукта
	 */
	getProduct(id: string): Promise<IProduct>;

	/**
	 * Создать заказ
	 * @param order - данные заказа
	 */
	createOrder(order: IOrderRequest): Promise<IOrderResult>;
}
