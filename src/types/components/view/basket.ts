/**
 * Типы для Basket View компонентов
 */

import { ProductId } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ModalActionsData, ModalContentData, ModalContentSettings } from './modal';

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
export interface BasketModalData extends ModalContentData {
	items: BasketProductData[];
	/** Общая сумма — форматируется снаружи и передаётся в actionsView.secondary */
	total: number;
	button: ButtonData;
}

/**
 * Настройки для модалки корзины
 * Инжектированные View передаются через settings
 */
export interface BasketModalSettings extends ModalContentSettings {
	/** View для элемента корзины */
	itemView: IView<BasketProductData>;
	/** View для футера (используем универсальный ModalActionsView) */
	actionsView: IView<ModalActionsData>;
	/** Callback удаления элемента */
	onDelete: (id: ProductId) => void;
	/** Функция форматирования цены */
	formatPrice: (value: number) => string;
}
