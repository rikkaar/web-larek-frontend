/**
 * Типы для Product View компонентов
 */

import { ProductId, ProductCategory, NormalizedProduct } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ChipData } from './chip';
import { ModalScreenSettings } from './screen';

// ============================================================================
// ProductPreview (карточка в галерее)
// ============================================================================

/**
 * Данные для карточки продукта в галерее
 */
export interface ProductPreviewData {
	id: ProductId;
	title: string;
	image: string;
	price: number | null;
	category: ProductCategory;
}

/**
 * Настройки для ProductPreview
 */
export interface ProductPreviewSettings {
	/** Селекторы элементов */
	titleSelector: string;
	imageSelector: string;
	priceSelector: string;
	/** Инжектированный View для категории (ChipView) */
	categoryView: IView<ChipData>;
	/** Callback клика по карточке */
	onClick: (id: ProductId) => void;
	/** Функция форматирования цены */
	formatPrice: (value: number | null) => string;
}

// ============================================================================
// ProductModal (карточка продукта в модалке)
// ============================================================================

/**
 * Данные для карточки продукта в модалке
 */
export interface ProductModalData {
	title: string;
	image: string;
	price: number | null;
	category: ProductCategory;
	description: string;
	button: ButtonData;
}

/**
 * Настройки для ProductModal.
 *
 * View получает Controller — this.settings содержит методы Controller.
 * View сам создаёт вложенные View (ButtonView, ChipView) из глобального settings.
 */
export interface ProductModalSettings {
	/** Callback: добавить/убрать из корзины */
	onToggleBasket: () => void;
	/** Функция форматирования цены */
	formatPrice: (value: number | null) => string;
}

// ============================================================================
// ProductScreen (экран продукта)
// ============================================================================

/**
 * Настройки ProductScreen = методы Controller
 */
export interface ProductScreenSettings extends ModalScreenSettings {
	/** Callback: добавить/убрать из корзины */
	onToggleBasket: () => void;
}

/**
 * Данные для ProductScreen
 */
export interface ProductScreenData extends NormalizedProduct {
	/** Товар в корзине? */
	isInBasket: boolean;
	/** Открыть модалку */
	isActive?: boolean;
}
