/**
 * Типы для универсальной работы с полями формы
 */

/**
 * Конфигурация поля формы
 * @template K — тип ключа поля (например, 'email' | 'phone')
 */
export interface FormFieldConfig<K extends string> {
	/** Имя поля (ключ для сохранения значения) */
	name: K;
	/** Селектор input-элемента */
	selector: string;
}

/**
 * Данные полей формы
 * @template K — тип ключа поля
 */
export type FormFieldsData<K extends string> = Record<K, string>;

/**
 * Настройки для работы с полями формы
 * @template K — тип ключа поля
 */
export interface FormFieldsSettings<K extends string> {
	/** Конфигурация полей */
	fields: FormFieldConfig<K>[];
	/** Универсальный callback изменения поля */
	onChange: (field: K, value: string) => void;
}

