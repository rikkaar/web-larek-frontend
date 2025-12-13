/**
 * Типы для HeaderBasket View (кнопка корзины в хедере)
 */

import { IClickable } from '@/types/components/base/view';

/**
 * Данные для кнопки корзины
 */
export interface HeaderBasketData {
	/** Счётчик товаров */
	counter: number;
}

/**
 * Настройки для кнопки корзины
 */
export interface HeaderBasketSettings extends IClickable<void> {
	/** Селектор счётчика */
	counterSelector: string;
}

