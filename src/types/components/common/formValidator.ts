/**
 * Типы для FormValidator
 *
 * FormValidator — абстрактный инструмент для валидации форм.
 * Работает с любой библиотекой валидации через Standard Schema.
 * https://standardschema.dev/
 */

import type { StandardSchemaV1 } from '@standard-schema/spec';

// Реэкспорт для удобства
export type { StandardSchemaV1 };

/**
 * Состояние формы
 */
export interface FormState<T> {
	/** Текущие значения полей */
	values: T;
	/** Ошибки валидации по полям */
	errors: Partial<Record<keyof T, string>>;
	/** Валидна ли форма */
	valid: boolean;
}

/**
 * Интерфейс FormValidator
 */
export interface IFormValidator<T> {
	/** Установить значение поля */
	setValue<K extends keyof T>(field: K, value: T[K]): void;

	/** Получить текущее состояние */
	getState(): FormState<T>;

	/** Получить текущие значения */
	getValues(): T;

	/** Получить ошибки как массив строк */
	getErrorsArray(): string[];

	/** Валидна ли форма */
	readonly valid: boolean;

	/** Сбросить форму к начальным значениям */
	reset(): void;
}
