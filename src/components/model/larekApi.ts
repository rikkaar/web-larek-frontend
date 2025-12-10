import { Api, ApiListResponse } from '../base/api';
import {
	IProduct,
	ILarekApi,
	IOrderRequest,
	IOrderResult,
} from '@/types/components/model/larekApi';

/**
 * Класс для работы с API Larek
 */
export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	/**
	 * Получить список продуктов
	 */
	async getProducts(): Promise<IProduct[]> {
		const data = (await this.get('/product/')) as ApiListResponse<IProduct>;
		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	/**
	 * Получить продукт по id
	 * @param id - идентификатор продукта
	 */
	async getProduct(id: string): Promise<IProduct> {
		const item = (await this.get(`/product/${id}`)) as IProduct;
		return {
			...item,
			image: this.cdn + item.image,
		};
	}

	/**
	 * Создать заказ
	 * @param order - данные заказа
	 */
	async createOrder(order: IOrderRequest): Promise<IOrderResult> {
		return (await this.post('/order', order)) as IOrderResult;
	}
}
