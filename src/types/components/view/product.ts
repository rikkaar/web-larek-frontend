/**
 * Типы для Product View компонентов
 */

import { ProductId, ProductCategory } from '@/types/components/model/larekApi';
import { IView } from '@/types/components/base/view';
import { ButtonData } from './common';
import { ModalContentData, ModalContentSettings, ModalTitleData, ModalActionsData } from './modal';

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
	onClick: (id: ProductId) => void;
}

// ============================================================================
// ProductModal (карточка продукта в модалке)
// ============================================================================

/**
 * Данные для карточки продукта в модалке
 */
export interface ProductModalData extends ModalContentData {
	id: ProductId;
	image: string;
	price: number | null;
	category: ProductCategory;
	description: string;
	button: ButtonData;
}

/**
 * Настройки для ProductModal
 */
export interface ProductModalSettings extends ModalContentSettings {
	/** View для футера (кнопка "В корзину") */
	actionsView: IView<ModalActionsData>;
	/** Callback добавления/удаления из корзины */
	onToggleBasket: (id: ProductId) => void;
}

// ============================================================================
// Маппинг категорий
// ============================================================================

/**
 * Маппинг категории на CSS-класс модификатора
 */
export const categoryClassMap: Record<ProductCategory, string> = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	'другое': 'card__category_other',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
};
