export type Brand<T, B extends string> = T & { readonly _brand: B };

export type ProductId = Brand<string, 'ProductId'>;
export type OrderId = Brand<string, 'OrderId'>;

export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка';

export type PaymentMethod = 'online' | 'cash';

export interface Product {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number | null;
}

export interface OrderRequest {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: ProductId[];
}

export interface OrderResult {
	id: OrderId;
	total: number;
}

export interface ILarekApi {
	getProducts(): Promise<Product[]>;

	getProduct(id: string): Promise<Product>;

	createOrder(order: OrderRequest): Promise<OrderResult>;
}
