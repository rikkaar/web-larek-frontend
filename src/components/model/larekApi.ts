import { Api, ApiListResponse } from '../base/api';
import {
	Product,
	ILarekApi,
	OrderRequest,
	OrderResult,
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

    private getCdnUrl(url: string): string {
        return this.cdn + url;
    }

	/**
	 * Получить список продуктов
	 */
	async getProducts(): Promise<Product[]> {
		const data = (await this.get<ApiListResponse<Product>>('/product/'));
		return data.items.map((item) => ({
			...item,
			image: this.getCdnUrl(item.image),
		}));
	}

	/**
	 * Получить продукт по id
	 * @param id - идентификатор продукта
	 */
	async getProduct(id: string): Promise<Product> {
		const item = await this.get<Product>(`/product/${id}`);
		return {
			...item,
			image: this.getCdnUrl(item.image),
		};
	}

	/**
	 * Создать заказ
	 * @param order - данные заказа
	 */
	async createOrder(order: OrderRequest): Promise<OrderResult> {
		return await this.post<OrderResult>('/order', order);
	}
}
