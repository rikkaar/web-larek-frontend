/**
 * Типы для Basket View компонентов
 */

import { ProductId } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './common';
import { ModalContentData, ModalContentSettings, ModalTitleData } from './modal';

// ============================================================================
// BasketProduct (элемент корзины)
// ============================================================================

/**
 * Данные для элемента корзины
 */
export interface BasketProductData {
	id: ProductId;
	title: string;
	price: number;
}

/**
 * Настройки для элемента корзины
 */
export interface BasketProductSettings {
	onDelete: (id: ProductId) => void;
}

// ============================================================================
// BasketActions (футер корзины — кнопка + цена)
// ============================================================================

/**
 * Данные для футера корзины
 */
export interface BasketActionsData {
	button: ButtonData;
	total: number;
}

/**
 * Настройки для футера корзины
 */
export interface BasketActionsSettings {
	onSubmit: () => void;
}

// ============================================================================
// BasketModal (контент модалки корзины)
// ============================================================================

/**
 * Данные для модалки корзины
 */
export interface BasketModalData extends ModalContentData {
	items: BasketProductData[];
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
	/** View для футера корзины */
	actionsView: IView<BasketActionsData>;
	/** Callback удаления элемента */
	onDelete: (id: ProductId) => void;
	/** Callback оформления */
	onSubmit: () => void;
}
