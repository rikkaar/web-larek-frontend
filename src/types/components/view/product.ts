/**
 * Типы для Product View компонентов
 */

import { ProductId, ProductCategory } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';
import { ChipData } from './chip';

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
 * Настройки для ProductModal
 */
export interface ProductModalSettings {
	/** Селекторы элементов */
	imageSelector: string;
	titleSelector: string;
	descriptionSelector: string;
	priceSelector: string;
	/** Инжектированные View */
	categoryView: IView<ChipData>;
	buttonView: IView<ButtonData>;
	/** Функция форматирования цены */
	formatPrice: (value: number | null) => string;
}
