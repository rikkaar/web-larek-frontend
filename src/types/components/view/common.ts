/**
 * Общие типы для View-компонентов
 */

import { ProductCategory } from '@/types/components/model/larekApi';

/**
 * Цвета категорий продуктов (модификаторы CSS)
 */
export type CategoryColor =
	| 'soft'       // софт-скил
	| 'hard'       // хард-скил
	| 'other'      // другое
	| 'additional' // дополнительное
	| 'button';    // кнопка

/**
 * Маппинг категории продукта на CSS-модификатор
 */
export const categoryColorMap: Record<ProductCategory, CategoryColor> = {
	'софт-скил': 'soft',
	'хард-скил': 'hard',
	'другое': 'other',
	'дополнительное': 'additional',
	'кнопка': 'button',
};

/**
 * Данные для chip (категория)
 */
export interface ChipData {
	label: string;
	color: CategoryColor;
}
