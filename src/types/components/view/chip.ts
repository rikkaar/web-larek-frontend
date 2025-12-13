/**
 * Типы для Chip View компонента
 */

import { ProductCategory } from '@/types/components/model/larekApi';

/**
 * Данные для Chip — категория продукта
 */
export interface ChipData {
	category: ProductCategory;
}

/**
 * Маппинг категории на текст (label)
 */
export type ChipLabelMap = Record<ProductCategory, string>;

/**
 * Маппинг категории на CSS-класс
 */
export type ChipClassMap = Record<ProductCategory, string>;

/**
 * Настройки для Chip — маппинги для label и className
 */
export interface ChipSettings {
	labels: ChipLabelMap;
	classes: ChipClassMap;
}

