/**
 * Типы для Page View (главная страница)
 */

import { IView } from '@/types/components/base/view';
import { HeaderBasketData } from './headerBasket';
import { ProductId, NormalizedProduct } from '@/types/components/model/larekApi';

/**
 * Данные для страницы
 */
export interface PageData {
	/** Данные для корзины в хедере */
	basket: HeaderBasketData;
	/** Элементы галереи */
	gallery: HTMLElement[];
	/** Заблокирована ли страница (при открытой модалке) */
	locked: boolean;
}

/**
 * Настройки для страницы
 */
export interface PageSettings {
	/** Селекторы */
	wrapperSelector: string;
	gallerySelector: string;
	/** CSS-класс для блокировки скролла */
	lockedClass: string;
	/** Инжектированный View корзины */
	basketView: IView<HeaderBasketData>;
}

// ============================================================================
// PageScreen (экран главной страницы)
// ============================================================================

/**
 * Настройки PageScreen = методы Controller
 */
export interface PageScreenSettings {
	onProductClick: (id: ProductId) => void;
	onBasketClick: () => void;
}

/**
 * Данные для PageScreen
 */
export interface PageScreenData {
	products?: NormalizedProduct[];
	basketCount?: number;
	locked?: boolean;
}
