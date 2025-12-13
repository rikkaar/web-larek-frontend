/**
 * Типы для Chip View компонента
 */

/**
 * Цвета категорий (модификаторы CSS)
 * При добавлении нового цвета TypeScript потребует добавить его в ChipLabelMap и ChipClassMap
 */
export type ChipColor =
	| 'soft'       // софт-скил
	| 'hard'       // хард-скил
	| 'other'      // другое
	| 'additional' // дополнительное
	| 'button';    // кнопка

/**
 * Данные для Chip — только цвет, остальное через settings
 */
export interface ChipData {
	color: ChipColor;
}

/**
 * Маппинг цвета на текст (label)
 */
export type ChipLabelMap = Record<ChipColor, string>;

/**
 * Маппинг цвета на CSS-класс
 */
export type ChipClassMap = Record<ChipColor, string>;

/**
 * Настройки для Chip — маппинги для label и className
 */
export interface ChipSettings {
	labels: ChipLabelMap;
	classes: ChipClassMap;
}

