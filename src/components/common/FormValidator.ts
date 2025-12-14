import type { StandardSchemaV1 } from '@standard-schema/spec';
import {
	IFormValidator,
	FormState,
} from '@/types/components/common/formValidator';

/**
 * FormValidator — абстрактный валидатор форм.
 *
 * Работает с любой библиотекой валидации через Standard Schema:
 * - Zod 3.24+
 * - Valibot 1.0+
 * - ArkType 2.0+
 * - и др. (https://standardschema.dev/)
 *
 * @template T — тип данных формы
 *
 * @example
 * // С Zod
 * const validator = new FormValidator(zodSchema, { email: '', phone: '' });
 *
 * // При изменении поля
 * validator.setValue('email', 'test@example.com');
 *
 * // Получить состояние
 * const { valid, errors } = validator.getState();
 * view.render({ error: validator.getErrorsArray()[0] ?? '' });
 */
export class FormValidator<T extends Record<string, unknown>>
	implements IFormValidator<T>
{
	private values: T;
	private state: FormState<T>;
	private readonly initialValues: T;

	constructor(
		private readonly schema: StandardSchemaV1<T>,
		initialValues: T
	) {
		this.initialValues = { ...initialValues };
		this.values = { ...initialValues };
		this.state = this.createInitialState();
		this.validate();
	}

	/**
	 * Создать начальное состояние
	 */
	private createInitialState(): FormState<T> {
		return {
			values: { ...this.values },
			errors: {},
			valid: false,
		};
	}

	/**
	 * Установить значение поля
	 */
	setValue<K extends keyof T>(field: K, value: T[K]): void {
		this.values[field] = value;
		this.validate();
	}

	/**
	 * Валидировать форму и обновить состояние
	 */
	private validate(): void {
		const result = this.schema['~standard'].validate(this.values);

		// Standard Schema может возвращать Promise, но мы работаем синхронно
		if (result instanceof Promise) {
			throw new Error('FormValidator: async validation is not supported');
		}

		if (result.issues) {
			// Валидация провалена
			this.state = {
				values: { ...this.values },
				errors: this.extractErrors(result.issues),
				valid: false,
			};
		} else {
			// Валидация успешна
			this.state = {
				values: { ...this.values },
				errors: {},
				valid: true,
			};
		}
	}

	/**
	 * Извлечь ошибки из issues
	 */
	private extractErrors(
		issues: ReadonlyArray<StandardSchemaV1.Issue>
	): Partial<Record<keyof T, string>> {
		const errors: Partial<Record<keyof T, string>> = {};
		for (const issue of issues) {
			const field = issue.path?.[0] as keyof T | undefined;
			if (field && !errors[field]) {
				errors[field] = issue.message;
			}
		}
		return errors;
	}

	/**
	 * Получить текущее состояние
	 */
	getState(): FormState<T> {
		return { ...this.state };
	}

	/**
	 * Получить текущие значения
	 */
	getValues(): T {
		return { ...this.state.values };
	}

	/**
	 * Получить ошибки как массив строк
	 */
	getErrorsArray(): string[] {
		return Object.values(this.state.errors).filter(
			(error): error is string => typeof error === 'string'
		);
	}

	/**
	 * Валидна ли форма
	 */
	get valid(): boolean {
		return this.state.valid;
	}

	/**
	 * Сбросить форму к начальным значениям
	 */
	reset(): void {
		this.values = { ...this.initialValues };
		this.validate();
	}
}
