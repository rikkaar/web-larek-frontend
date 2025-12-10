/**
 * Типы для FormValidator
 * 
 * FormValidator — инструмент Controller'а для управления состоянием формы.
 * 
 * НЕ emit'ит события, НЕ обновляет View.
 * Controller сам решает что делать с результатами.
 */

import { z } from 'zod';

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
 * Результат валидации одного поля
 */
export interface FieldValidationResult {
	/** Валидно ли поле */
	valid: boolean;
	/** Сообщение об ошибке (null если валидно) */
	error: string | null;
}

/**
 * Результат валидации всей формы
 */
export interface FormValidationResult<T> {
	/** Валидна ли форма */
	valid: boolean;
	/** Ошибки по полям */
	errors: Partial<Record<keyof T, string>>;
	/** Данные формы (null если невалидна) */
	data: T | null;
}

/**
 * Интерфейс FormValidator
 * T — тип данных формы (выводится из zod схемы)
 */
export interface IFormValidator<T> {
	/**
	 * Установить значение поля и провалидировать
	 */
	setValue<K extends keyof T>(field: K, value: T[K]): FieldValidationResult;

	/**
	 * Установить несколько значений
	 */
	setValues(values: Partial<T>): FormValidationResult<T>;

	/**
	 * Валидировать всю форму
	 */
	validate(): FormValidationResult<T>;

	/**
	 * Получить текущее состояние
	 */
	getState(): FormState<T>;

	/**
	 * Получить значения
	 */
	getValues(): T;

	/**
	 * Получить ошибки
	 */
	getErrors(): Partial<Record<keyof T, string>>;

	/**
	 * Проверить валидность
	 */
	isValid(): boolean;

	/**
	 * Сбросить форму к начальным значениям
	 */
	reset(): void;

	/**
	 * Очистить ошибки (без сброса значений)
	 */
	clearErrors(): void;
}

/**
 * Конструктор FormValidator
 */
export interface IFormValidatorConstructor {
	new <S extends z.ZodObject<z.ZodRawShape>>(
		schema: S,
		initialValues: z.infer<S>
	): IFormValidator<z.infer<S>>;
}
