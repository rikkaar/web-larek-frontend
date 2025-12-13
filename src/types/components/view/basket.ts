/**
 * Типы для Basket View компонентов
 */

import { ProductId } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

// ============================================================================
// BasketProduct (элемент корзины)
// ============================================================================

/**
 * Данные для элемента корзины
 */
export interface BasketProductData {
	id: ProductId;
	index: number;
	title: string;
	price: number;
}

/**
 * Настройки для элемента корзины
 */
export interface BasketProductSettings {
	/** Селекторы элементов */
	indexSelector: string;
	titleSelector: string;
	priceSelector: string;
	deleteSelector: string;
	/** Callback удаления */
	onDelete: (id: ProductId) => void;
	/** Функция форматирования цены */
	formatPrice: (value: number) => string;
}

// ============================================================================
// BasketModal (контент модалки корзины)
// ============================================================================

/**
 * Данные для модалки корзины
 */
export interface BasketModalData {
	items: BasketProductData[];
	total: number;
	button: ButtonData;
}

/**
 * Настройки для модалки корзины
 */
export interface BasketModalSettings {
	/** Селекторы элементов */
	listSelector: string;
	priceSelector: string;
	/** Инжектированные View */
	itemView: IView<BasketProductData>;
	buttonView: IView<ButtonData>;
	/** Функция форматирования цены */
	formatPrice: (value: number) => string;
}
